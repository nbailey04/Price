#  Price Searcher

A full-stack web tool that retrieves real-time product prices from multiple public APIs. Users can input a product name and instantly compare prices across various online sources.



## Features

- Live product search using multiple APIs
- Real-time data fetching with loading and error handling
- Responsive UI built with React.js and custom styling
- Backend routing and secure environment variable handling using Flask and `dotenv`
- Modular code structure with reusable components
- Clean API response formatting and dynamic UI updates



## Tech Stack

**Frontend:**
- React.js
- JavaScript
- HTML/CSS

**Backend:**
- Flask (Python)
- RESTful API integration
- `python-dotenv` for environment config

**Tools:**
- Git + GitHub
- Postman (API testing)
- Docker (optional for deployment)



## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/Price.git
   cd Price



# Frontend

cd next-frontend
npm install
npm run dev



# Backend

cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
Environment Variables

Create a .env file in the backend folder:

API_KEY=your_actual_api_key_here
FLASK_ENV=development





### Example Use Case
Enter a product like toothpaste and see price data from Target, Walmart, or other vendors (if connected). Great for price comparison or deal tracking.

### Security Notes
All API keys are hidden via .env files and never exposed to the frontend.

#### Make sure to never commit .env to source control.


# Author
Nathan Bailey

Bachelor's in Computer Science, Georgia State University

[LinkedIn](http://www.linkedin.com/in/nathan-bailey-9969131bb) | [GitHub](https://github.com/nbailey04)
