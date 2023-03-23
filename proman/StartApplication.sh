runBackend(){
  cd backend
  mvn spring-boot:run
}

runFrontend(){
  cd frontend
  npm run start
}

runBackend | runFrontend