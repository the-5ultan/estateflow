package com.estateflow.config;

import com.estateflow.auth.CsrfController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = {SystemController.class, CsrfController.class},
        properties = "app.frontend-origin=http://localhost:5173")
@Import(SecurityConfig.class)
class SecurityConfigTest {
    @Autowired MockMvc mvc;

    @Test void publicStatusExplicitlyReportsUnimplementedCapabilities() throws Exception {
        mvc.perform(get("/api/v1/system/status"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.authenticationEnabled").value(false))
            .andExpect(jsonPath("$.propertyBrowsingEnabled").value(false));
    }

    @Test void csrfTokenIsAvailableWithoutBeingCacheable() throws Exception {
        mvc.perform(get("/api/v1/auth/csrf"))
            .andExpect(status().isOk())
            .andExpect(header().string("Cache-Control", "no-store"))
            .andExpect(jsonPath("$.headerName").value("X-CSRF-TOKEN"))
            .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test void mutationWithoutCsrfIsRejected() throws Exception {
        mvc.perform(post("/api/v1/agents/register"))
            .andExpect(status().isForbidden());
    }

    @Test void evenAuthenticatedRolesCannotAccessFuturePropertyEndpoints() throws Exception {
        mvc.perform(get("/api/v1/agent/properties").with(user("agent").roles("AGENT")))
            .andExpect(status().isForbidden());
    }

    @Test void validCsrfDoesNotUnlockFutureRegistration() throws Exception {
        mvc.perform(post("/api/v1/agents/register").with(csrf()).with(user("user")))
            .andExpect(status().isForbidden());
    }

    @Test void unknownOriginsCannotMakeCredentialedRequests() throws Exception {
        mvc.perform(options("/api/v1/system/status").header("Origin", "https://untrusted.example")
            .header("Access-Control-Request-Method", "GET"))
            .andExpect(status().isForbidden());
    }

    @Test void localFrontendOriginIsAllowed() throws Exception {
        mvc.perform(options("/api/v1/system/status").header("Origin", "http://localhost:5173")
            .header("Access-Control-Request-Method", "GET"))
            .andExpect(status().isOk())
            .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
            .andExpect(header().string("Access-Control-Allow-Credentials", "true"));
    }
}
