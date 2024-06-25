#include "crow_all.h"

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([](){
        return "Hello from the C++ algorithm server!";
    });

    app.port(8080).multithreaded().run();
    return 0;
}
