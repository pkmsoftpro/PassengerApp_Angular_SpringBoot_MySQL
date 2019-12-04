**# PassengerApp_Angular_SpringBoot_MySQL**  

*Angular FullStack Application, Spring Boot, MySql*


Used Spring Boot and JPA.  

Add the following bean to allow GET,PUT,POST,DELETE through [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)(Cross Origin Resource Sharing).

```
  @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/userendpoint/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
```
## Data Set:  
https://github.com/pkmsoftpro/PassengerApp_Angular_SpringBoot_MySQL/blob/springboot_crud_mysql/src/main/resources/train.csv  

## MySQL Script:

```
1. create database test1;
2. use  test1;
3. create table passengers(
      Passengerid int,
      Pclass int,
      Name varchar(100),
      Sex varchar(10),
      Age double(5,2),
      Sibsp int,
      Parch int,
      Ticket varchar(20),
      Fare double(10,2),
      Cabin varchar(20),
      Embarked varchar(1)
    ); 
```

## Utility class to populate the database:
  ```https://github.com/pkmsoftpro/PassengerApp_Angular_SpringBoot_MySQL/tree/springboot_crud_mysql/src/main/java/com/utility```
