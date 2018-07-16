package don.geronimo.reactvotingapp.persistance;

import don.geronimo.reactvotingapp.model.Option;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OptionRepository  extends MongoRepository<Option, String> {
}
