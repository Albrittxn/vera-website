import http.server
import socketserver
import os
import sys
import json
import urllib.request
import urllib.error
import uuid
import math

PORT = 8000

# Load .env variables if file exists
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

def calculate_shipping(subtotal):
    if subtotal <= 0 or subtotal >= 50:
        return 0
    return max(2, int(math.ceil(subtotal / 10.0)) * 2)

def apply_coupon_to_line_items(coupon_code, cart_items):
    code = (coupon_code or '').strip().upper()
    processed_items = []
    for item in cart_items:
        processed_items.append({
            'name': item.get('name', 'VERA Product'),
            'color': item.get('color', ''),
            'size': item.get('size', ''),
            'price': float(item.get('price', 0)),
            'quantity': int(item.get('quantity', 1)),
            'discount_note': ''
        })

    if not code or not processed_items:
        return processed_items

    if code == 'ELLIE':
        max_idx = max(range(len(processed_items)), key=lambda i: processed_items[i]['price'])
        processed_items[max_idx]['price'] = 0.0
        processed_items[max_idx]['discount_note'] = 'ELLIE 100% OFF'

    elif code == 'ELLIE2':
        if len(processed_items) >= 3:
            sorted_indices = sorted(range(len(processed_items)), key=lambda i: processed_items[i]['price'])
            processed_items[sorted_indices[0]]['price'] = 0.0
            processed_items[sorted_indices[0]]['discount_note'] = 'ELLIE2 Free Item'
            processed_items[sorted_indices[1]]['price'] = 0.0
            processed_items[sorted_indices[1]]['discount_note'] = 'ELLIE2 Free Item'

    return processed_items

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def _rewrite_clean_path(self):
        parts = self.path.split('?')
        path_only = parts[0]
        query = f"?{parts[1]}" if len(parts) > 1 else ""

        if path_only != '/' and path_only != '':
            clean_name = path_only.lstrip('/')
            if not clean_name.endswith('.html') and not os.path.exists(self.translate_path(path_only)):
                html_filename = f"{clean_name}.html"
                local_path = self.translate_path(f"/{html_filename}")
                if os.path.exists(local_path):
                    self.path = f"/{html_filename}{query}"

    def do_GET(self):
        self._rewrite_clean_path()
        return super().do_GET()

    def do_HEAD(self):
        self._rewrite_clean_path()
        return super().do_HEAD()

    def do_POST(self):
        if self.path == '/api/create-checkout':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body) if body else {}
            except Exception:
                data = {}

            raw_cart_items = data.get('items', [])
            coupon_code = data.get('coupon', '')

            access_token = os.environ.get('SQUARE_ACCESS_TOKEN', '')
            location_id = os.environ.get('SQUARE_LOCATION_ID', '')
            env = os.environ.get('SQUARE_ENVIRONMENT', 'sandbox').lower()

            is_placeholder = (
                not access_token or 
                'YOUR_' in access_token or 
                not location_id or 
                'YOUR_' in location_id
            )

            if is_placeholder:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response_data = {
                    "status": "config_required",
                    "message": "Square API credentials required in .env file",
                    "environment": env,
                    "location_id": location_id,
                    "items": raw_cart_items
                }
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
                return

            domain = "connect.squareupsandbox.com" if env == 'sandbox' else "connect.squareup.com"
            url = f"https://{domain}/v2/online-checkout/payment-links"

            original_subtotal = sum(float(item.get('price', 0)) * int(item.get('quantity', 1)) for item in raw_cart_items)
            processed_items = apply_coupon_to_line_items(coupon_code, raw_cart_items)
            discounted_subtotal = sum(item['price'] * item['quantity'] for item in processed_items)

            line_items = []
            for item in processed_items:
                name = item['name']
                color = item['color']
                size = item['size']
                discount_note = item['discount_note']
                details = []
                if color: details.append(color)
                if size and size != 'O/S': details.append(f"Size {size}")
                
                title = f"{name} ({', '.join(details)})" if details else name
                if discount_note:
                    title += f" — {discount_note}"

                price_cents = int(round(item['price'] * 100))

                line_items.append({
                    "name": title,
                    "quantity": str(item['quantity']),
                    "base_price_money": {
                        "amount": price_cents,
                        "currency": "USD"
                    }
                })

            shipping_fee = 0 if discounted_subtotal >= 50 else calculate_shipping(original_subtotal)
            if shipping_fee > 0:
                line_items.append({
                    "name": "Standard Shipping",
                    "quantity": "1",
                    "base_price_money": {
                        "amount": int(round(shipping_fee * 100)),
                        "currency": "USD"
                    }
                })

            payload = {
                "idempotency_key": str(uuid.uuid4()),
                "order": {
                    "location_id": location_id,
                    "line_items": line_items
                },
                "checkout_options": {
                    "redirect_url": "http://localhost:8000/cart?checkout=success",
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
            return

        self.send_response(404)
        self.end_headers()

if __name__ == '__main__':
    sys.stdout.reconfigure(line_buffering=True)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
        print(f"VERA Server running on http://localhost:{PORT} with Direct Line Item Checkout")
        httpd.serve_forever()
