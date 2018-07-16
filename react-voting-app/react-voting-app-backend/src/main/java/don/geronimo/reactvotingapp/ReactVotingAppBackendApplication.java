package don.geronimo.reactvotingapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"don.geronimo.reactvotingapp","don.geronimo.reactvotingapp.controller"})
public class ReactVotingAppBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactVotingAppBackendApplication.class, args);
    }
}
