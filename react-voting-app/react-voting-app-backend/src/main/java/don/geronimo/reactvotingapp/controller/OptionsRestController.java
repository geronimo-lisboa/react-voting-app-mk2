package don.geronimo.reactvotingapp.controller;

import don.geronimo.reactvotingapp.services.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/votingoptions")
public class OptionsRestController {
    private OptionService optionService;
    @Autowired
    public OptionsRestController(OptionService optionService){
        this.optionService = optionService;
    }
}
