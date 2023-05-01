// configuration for develepment and production environments

// General
class Config {

}

// Development Environment
class DevelopmentConfig extends Config {
    productsUrl = "http://localhost:3030/api/products/";
    productsImagesUrl = "http://localhost:3030/api/products/images/";
    registerUrl = "http://localhost:3030/api/auth/register";
    loginUrl = "http://localhost:3030/api/auth/login";
}

// Production Environment
class ProductionConfig extends Config {
    productsUrl = "http://northwind.com/api/products/";
    productsImagesUrl = "http://northwind.com/api/products/images/";
    registerUrl = "http://northwind.com/api/auth/register";
    loginUrl = "http://northwind.com/api/auth/login";
}

const appConfig = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;