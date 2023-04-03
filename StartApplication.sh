runBackend(){
  cd proman
  cd backend
  mvn spring-boot:run
}

runFrontend(){
  cd proman
  cd frontend
  npm run start
}

runBackend | runFrontend