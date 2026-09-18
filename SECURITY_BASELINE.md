# Security baseline

- Android native app only; no shell execution.
- No Runtime.exec, ProcessBuilder, eval, or dynamic JavaScript execution.
- No cleartext network traffic is enabled.
- Microphone permission is requested only when voice input is used.
- Camera uses the system camera intent; no unrestricted camera service is exposed.
- Conversation history is kept locally in SharedPreferences.
- ModelAdapter is isolated so a future local/edge model can be added without changing the UI contract.
- Debug APK is for testing; a release distribution should use a project-specific signing key and release build configuration.
