package don.geronimo.reactvotingapp.services;

import don.geronimo.reactvotingapp.model.Option;
import don.geronimo.reactvotingapp.persistance.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OptionService {
    private OptionRepository optionRepository;
    @Autowired
    public OptionService(OptionRepository optionRepository){
        this.optionRepository = optionRepository;
    }

    public List<Option> getAll(){
        return optionRepository.findAll();
    }


    public Option saveOption(Option newOp) {
        return optionRepository.save(newOp);
    }

    public Option findById(String id) {
        Optional<Option> result = optionRepository.findById(id);
        if(result.isPresent())
            return result.get();
        else
            return null;
    }

    public Option updateOption(Option updatedOption) {
        return optionRepository.save(updatedOption);
    }

    public void deleteOptionById(String id) {
        optionRepository.deleteById(id);
    }

    public Long getCount(){
        return optionRepository.count();
    }
}
