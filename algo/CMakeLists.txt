cmake_minimum_required(VERSION 3.10)
project(ChessCraftAlgo)

set(CMAKE_CXX_STANDARD 17)

# Include Crow library headers
include_directories(/usr/local/include)
include_directories(/crow/include)

add_executable(ChessCraftAlgo main.cpp)

# Link Crow library
target_link_libraries(ChessCraftAlgo pthread)
