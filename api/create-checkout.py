from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.error
import uuid
import math

def calculate_shipping(subtotal):
    if subtotal <= 0 or subtotal >= 50:
        return 0
    return max(2, int(math.ceil(subtotal / 10.0)) * 2)

def calculate_coupon_discount(coupon_code, cart_items):
    if not coupon_code or not cart_items:
        return 0.0, ""
    code = coupon_code.strip().upper()
    prices = sorted([float(item.get('price', 0)) for item in cart_items])
    if not prices:
        return 0.0, ""

    if code == 'ELLIE':
        free_amount = max(prices)
        return free_amount, "Coupon ELLIE (1 Free Product)"

    if code == 'ELLIE2':
        if len(cart_items) < 3:
            return 0.0, ""
        free_amount = prices[0] + prices[1]
        return free_amount, "Coupon ELLIE2 (Buy 1 Get 2 Free)"

    return 0.0, ""

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            data = json.loads(body) if body else {}
        except Exception:
            data = {}

        cart_items = data.get('items', [])
        coupon_code = data.get('coupon', '')
        
        access_token = os.environ.get('SQUARE_ACCESS_TOKEN', 'EAAAl9rbYA4nEVssZWfJNN01kbyjozgSe4KvutMwdBWcp96ZdG0aijhT65MP91as')
        location_id = os.environ.get('SQUARE_LOCATION_ID', 'LAG66A16ZGGVR')
        env = os.environ.get('SQUARE_ENVIRONMENT', 'production').lower()

        domain = "connect.squareupsandbox.com" if env == 'sandbox' else "connect.squareup.com"
        url = f"https://{domain}/v2/online-checkout/payment-links"

        line_items = []
        subtotal = 0.0

        for item in cart_items:
            name = item.get('name', 'VERA Product')
            color = item.get('color', '')
            size = item.get('size', '')
            details = []
            if color: details.append(color)
            if size and size != 'O/S': details.append(f"Size {size}")
            title = f"{name} ({', '.join(details)})" if details else name
            item_price = float(item.get('price', 0))
            quantity = int(item.get('quantity', 1))
            subtotal += item_price * quantity
            price_cents = int(round(item_price * 100))

            line_items.append({
                "name": title,
                "quantity": str(quantity),
                "base_price_money": {
                    "amount": price_cents,
                    "currency": "USD"
                }
            })

        discount_amount, discount_title = calculate_coupon_discount(coupon_code, cart_items)
        discounted_subtotal = max(0.0, subtotal - discount_amount)
        shipping_fee = 0 if discounted_subtotal >= 50 else calculate_shipping(subtotal)

        if shipping_fee > 0:
            line_items.append({
                "name": "Standard Shipping ($2 per $10 under $50)",
                "quantity": "1",
                "base_price_money": {
                    "amount": int(round(shipping_fee * 100)),
                    "currency": "USD"
                }
            })

        host = self.headers.get('Host', 'veraclothing.store')
        scheme = 'https' if 'veraclothing.store' in host or 'vercel.app' in host else 'http'
        redirect_url = f"{scheme}://{host}/cart?checkout=success"

        order_payload = {
            "location_id": location_id,
            "line_items": line_items
        }

        if discount_amount > 0 and discount_title:
            order_payload["discounts"] = [
                {
                    "name": discount_title,
                    "amount_money": {
                        "amount": int(round(discount_amount * 100)),
                        "currency": "USD"
                    }
                }
            ]

        payload = {
            "idempotency_key": str(uuid.uuid4()),
            "order": order_payload,
            "checkout_options": {
                "redirect_url": redirect_url,
                "ask_for_shipping_address": True
            }
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
                "Square-Version": "2024-12-18"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as resp:
                resp_data = json.loads(resp.read().decode('utf-8'))
                payment_link = resp_data.get('payment_link', {})
                checkout_url = payment_link.get('url', '')

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success",
                    "checkout_url": checkout_url
                }).encode('utf-8'))
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8')
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "error",
                "error": err_body
            }).encode('utf-8'))
        except Exception as ex:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "error",
                "error": str(ex)
            }).encode('utf-8'))
