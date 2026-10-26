package com.estateflow.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/system")
public class SystemController {
    @GetMapping("/status")
    public SystemStatus status() {
        return new SystemStatus("estateflow", 1, false, false);
    }

    public record SystemStatus(String application, int phase, boolean authenticationEnabled,
                               boolean propertyBrowsingEnabled) {}
}
