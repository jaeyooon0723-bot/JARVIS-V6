package com.jarvis.v6;

public final class LocalFallbackModel implements ModelAdapter {
    @Override public String generate(String input, String context) {
        String t = input == null ? "" : input.trim();
        if (t.isEmpty()) return "대기 중이야. 원하는 결과를 자연스럽게 말해줘.";
        return "요청을 목표 중심으로 정리했어.\n\n목표: " + t + "\n현재 단계: 이해 → 계획 → 실행 준비\n안전 상태: 확인 필요 작업은 실행 전에 다시 검증";
    }
}
