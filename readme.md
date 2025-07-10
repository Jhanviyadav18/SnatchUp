# E-Commerce Platform with Payment Integration

A robust e-commerce platform built with Spring Boot and integrated with Stripe for payment processing.

## Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Order processing
- Secure payment integration with Stripe
- Admin dashboard

## Technologies Used

- Java 11
- Spring Boot 2.7.0
- Spring Security
- Spring Data JPA
- H2 Database
- Stripe Payment Gateway
- Maven

## Prerequisites

- Java 11 or higher
- Maven
- Stripe Account (for payment processing)

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Configure application.properties:
- Set your Stripe API keys
- Configure database settings if needed

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Users
- `POST /api/users/register` - Register new user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user` - Get user's orders
- `PATCH /api/orders/{id}/status` - Update order status (Admin)

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/cancel-payment` - Cancel payment
- `GET /api/payments/payment-status` - Get payment status

## Security

- JWT-based authentication
- Role-based authorization (USER, ADMIN)
- Encrypted password storage
- CORS configuration

## Database

The application uses H2 in-memory database by default. The H2 console is available at `http://localhost:8080/h2-console` when the application is running.

## Payment Integration

The application uses Stripe for payment processing. You need to:
1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Add them to `application.properties`

## Error Handling

The application includes comprehensive error handling for:
- Invalid requests
- Authentication/Authorization errors
- Payment processing errors
- Resource not found errors

## Testing

Run the tests using:
```bash
mvn test
```

## Production Deployment

Before deploying to production:
1. Configure a production-grade database
2. Set up proper security measures
3. Configure production Stripe keys
4. Set up proper logging
5. Configure CORS for your domain

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.