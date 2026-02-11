package ResumeBuilder.backend.Utilities;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import org.springframework.stereotype.Service;

import ResumeBuilder.backend.Models.DatabaseModels.LineModel;

@Service
public class TemplateCacheUtility {
    private final Cache<String, ArrayList<LineModel>> _cache;

    public TemplateCacheUtility() {
        _cache = CacheBuilder.newBuilder().expireAfterWrite(60, TimeUnit.MINUTES).build();
    }

    // Attempt to add the key/value pair to the cache if the key doesn't exist
    public boolean putIfAbsent(String key, ArrayList<LineModel> value) {
        ArrayList<LineModel> previous = _cache.asMap().putIfAbsent(key, value);
        return previous == null;
    }

    // Add the key/value pair to the cache
    public void put(String key, ArrayList<LineModel> value) {
        _cache.put(key, value);
    }

    // Attempt to retrieve the value from the cache
    public ArrayList<LineModel> get(String key) {
        return _cache.getIfPresent(key);
    }
}
