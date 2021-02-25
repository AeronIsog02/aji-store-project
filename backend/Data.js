import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Aeron',
            email:'admin@gmail.com',
            password: bcrypt.hashSync('aeronpogi', 8),
            isAdmin: true,
        },
        {
            name: 'Ariane',
            email:'ariane@gmail.com',
            password: bcrypt.hashSync('aeronpogi', 8),
            isAdmin: false,
        },
    ],
    products:[
        {
            
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/assets/images/p1.jpg',
            price: 500,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            
            name: 'Addidas Fit Shirt',
            category: 'Shirts',
            image: '/assets/images/p1.jpg',
            price: 600,
            countInStock: 40,
            brand: 'Addidas',
            rating: 4,
            numReviews: 5,
            description: 'High quality product',
        },
        {
            
            name: 'Lacoste Slim Pants',
            category: 'Pants',
            image: '/assets/images/p5.jpg',
            price: 1000,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 18,
            description: 'High quality product',
        },
        {
            
            name: 'Puma Slim Pants',
            category: 'Pants',
            image: '/assets/images/p5.jpg',
            price: 800,
            countInStock: 12,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 22,
            description: 'High quality product',
        },
    ]
}

export default data;