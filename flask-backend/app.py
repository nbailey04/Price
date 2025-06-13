from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv('credentials.env')  # Load your .env file

app = Flask(__name__)
CORS(app)

client_id = os.getenv("KROGER_CLIENT_ID")
client_secret = os.getenv("KROGER_CLIENT_SECRET")

def get_access_token():
    url = "https://api.kroger.com/v1/connect/oauth2/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "client_credentials",
        "scope": "product.compact"
    }
    response = requests.post(url, headers=headers, data=data, auth=(client_id, client_secret))
    response.raise_for_status()
    return response.json()["access_token"]

def search_products(query):
    token = get_access_token()
    url = "https://api.kroger.com/v1/products"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "filter.term": query,
        "filter.limit": 50,
        "filter.zipCode.near": "30016",  # <== change to your ZIP code

    }
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')

    try:
        kroger_data = search_products(query)
        product_info = []
        for item in kroger_data.get("data", []):
            description = item.get("description", "No description")
            price_obj = item.get("items", [{}])[0].get("price", {})
            regular_price = price_obj.get("regular")

            formatted_price = (
                f"${regular_price:.2f}" if regular_price is not None else "Price unavailable"
            )

            product_info.append({
                "description": description,
                "price": formatted_price
            })

        return jsonify({
            "message": f"Results for: {query}",
            "results": product_info
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Error occurred", "results": []}), 500




@app.route('/', methods=['GET'])
def home():
    return 'Flask backend is running!'

# Optional: Run locally
if __name__ == "__main__":
    app.run(debug=True)
