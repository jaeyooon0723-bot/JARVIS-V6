# JARVIS V6 APK 빌드

이 폴더는 실제 Android APK 프로젝트다.

1. 이 폴더 내용을 컴퓨터 또는 Termux 작업 폴더에 둔다.
2. GitHub 인증이 된 상태에서 `./push_build_download.sh`를 실행한다.
3. GitHub Actions의 `JARVIS V6 Android APK` 작업이 `assembleDebug`를 실행한다.
4. 빌드 후 `gh run download -R jaeyooon0723-bot/JARVIS-V6 --name JARVIS-V6-debug-apk`로 APK artifact를 받는다.
5. APK 파일은 `app-debug.apk`이며 Android에서 일반적인 디버그 APK 설치 방식으로 설치한다.

CI 검증 항목:
- APK 파일 존재
- APK 서명 검증(apksigner)
- 패키지명 `com.jarvis.v6`
- minSdk 26
