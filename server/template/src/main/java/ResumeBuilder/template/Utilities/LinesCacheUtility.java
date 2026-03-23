package ResumeBuilder.template.Utilities;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import ResumeBuilder.common.Models.Common.LineModel;

import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class LinesCacheUtility {
    private final int _expiration;
    private final Cache<String, ArrayList<LineModel>> _cache;

    public LinesCacheUtility(Environment environment) {
        _expiration = Integer.parseInt(environment.getProperty("spring.cache.expiration"));
        _cache = CacheBuilder.newBuilder().expireAfterWrite(_expiration, TimeUnit.MINUTES).build();
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

    // Run a scheduled cleanup
    @Scheduled(fixedRateString = "${spring.cache.expiration}", initialDelayString = "${spring.cache.expiration}", timeUnit = TimeUnit.MINUTES)
    public void cleanUp() {
        _cache.cleanUp();
    }
}
