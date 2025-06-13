# Use official Python image (lightweight)
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy backend source code to container
COPY . .

# Expose the port Flask will listen on
EXPOSE 5000

# Run the Flask app using python -m to avoid PATH issues
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
