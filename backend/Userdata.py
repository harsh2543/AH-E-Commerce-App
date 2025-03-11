from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import datetime

app = Flask(__name__)
CORS(app)

payment_records = []

@app.route('/store-payment', methods=['POST'])
def store_payment():
    try:
        data = request.json
        
        required_fields = [
            'name', 'address', 'city', 'pincode', 'email',
            'amount', 'payment_method'
        ]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Validate payment method specific fields
        if data['payment_method'] == 'card':
            card_fields = ['number', 'expiry', 'cvv']
            if not all(field in data for field in card_fields):
                return jsonify({"error": "Missing card details"}), 400

        if data['payment_method'] == 'upi' and 'upi_id' not in data:
            return jsonify({"error": "Missing UPI ID"}), 400

        payment_record = {
            "id": str(uuid.uuid4()),
            **data,
            "status": "completed",
            "timestamp": datetime.now().isoformat()
        }

        payment_records.append(payment_record)
        return jsonify({"message": "Payment stored successfully", "id": payment_record['id']}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)