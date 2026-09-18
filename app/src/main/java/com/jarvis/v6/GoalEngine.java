package com.jarvis.v6;

public final class GoalEngine {
    public static final class Plan {
        public final String goal, desiredState, capability;
        Plan(String goal, String desiredState, String capability) { this.goal=goal; this.desiredState=desiredState; this.capability=capability; }
    }

    public Plan infer(String input) {
        String text = input == null ? "" : input.trim();
        if (text.isEmpty()) return new Plan("입력 대기", "다음 사용자 의도 확보", "대화");
        String capability = "대화/분석";
        if (text.contains("사진") || text.contains("카메라") || text.contains("보여")) capability = "카메라/관찰";
        else if (text.contains("말") || text.contains("소리") || text.contains("읽어")) capability = "음성/대화";
        else if (text.contains("기억") || text.contains("저장")) capability = "메모리";
        else if (text.contains("확인") || text.contains("왜") || text.contains("문제")) capability = "진단/검증";
        return new Plan(text, "사용자가 기대한 결과가 실제 상태에 반영됨", capability);
    }
}
