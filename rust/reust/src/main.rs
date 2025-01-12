use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

#[get("/api/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello World")
}

#[get("/")]
async fn root() -> impl Responder {
    HttpResponse::NotFound()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(root)
    })
    .bind(("127.0.0.1", 8081))?
    .run()
    .await
}