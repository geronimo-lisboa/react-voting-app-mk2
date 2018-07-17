package don.geronimo.reactvotingapp.controller;

import don.geronimo.reactvotingapp.model.Option;
import don.geronimo.reactvotingapp.services.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/votingoptions")
public class OptionsRestController {
    private OptionService optionService;
    @Autowired
    public OptionsRestController(OptionService optionService){
        this.optionService = optionService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Option> getAllOptions(){
        return optionService.getAll();
    }

    @PostMapping
    public ResponseEntity newOption(@RequestBody Option newOp){
        Option createdOption = optionService.saveOption(newOp);
        if(createdOption==null){
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdOption.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Option updateOption(@PathVariable String id, @RequestBody Option updatedOption){
        Option option = optionService.findById(id);
        if(option == null){
            //TODO: eu sei que não pode simplesmente estourar exceção aqui. Como retornar esse erro direito?
            throw new RuntimeException("nao sei");
        }
        updatedOption.setId(option.getId());
        return optionService.updateOption(updatedOption);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteOption(@PathVariable String id){
        Option op = optionService.findById(id);
        if(op == null){
            //TODO: eu sei que não pode simplesmente estourar exceção aqui. Como retornar esse erro direito?
            throw new RuntimeException("temp");
        }else{
            optionService.deleteOptionById(id);
            return new ResponseEntity("Opção excluída", HttpStatus.OK);
        }
    }
}
