# Parking Lot

This is a simple React application that simulates a parking lot. It allows users to park their car, pay for their parking, and leave the parking lot.

## Getting Started

1. Clone the repository to your local machine.
2. Run `npm install` to install the project's dependencies.
3. Run `npm run dev` to start the application.
4. Open your browser and navigate to `http://localhost:5173` to view the application.

## How to Use the Application

When the application loads, you will see a parking lot with a number of parking spots. You can click on an empty parking spot to park your car. Once parked, you can pay for your parking using the payment component located in the center of the parking lot. Finally, when you're ready to leave, you can click on the parking spot where your car is parked to exit the parking lot.

## Features

- Simulates a parking lot with a fixed number of parking spots.
- Allows users to park their car, pay for their parking, and leave the parking lot.
- Supports multiple payment methods, including credit card and cash.

## Functionality

The application is built using several components, including:

- **ParkingLot**: Renders the layout of the parking lot and its parking spots, and includes the PaymentComponent and Counter components.
- **ParkingSpot**: Represents an individual parking spot in the parking lot, and displays the spot number, ticket barcode, and payment information.
- **PaymentComponent**: Provides the user with the ability to pay for parking using a variety of payment methods, and displays a list of unpaid tickets.
- **Counter**: Displays the number of available parking spots in real-time.

The application also includes a **ParkingService** that handles all of the parking-related logic, including:

- Generating unique ticket barcodes.
- Managing the state of each parking spot (i.e. empty, occupied, paid, or unpaid).
- Calculating parking fees based on the duration of the parking session.
- Managing the payment of parking fees using different payment methods.

## Technologies Used

- React
- React Vite
- CSS

## Conclusion

This application is a simple and effective way to simulate a parking lot in a web-based environment. It can be used as a starting point for more complex parking-related applications, or as a tool for learning React development.
