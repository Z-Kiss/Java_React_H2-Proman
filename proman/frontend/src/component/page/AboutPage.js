import {Card} from "react-bootstrap";

export default function AboutPage() {

    return (
        <div className={"d-flex flex-column align-items-center gap-5 pt-5 "}>
            <Card className={"d-flex flex-column align-content-center  align-items-center  "}
                  style={{width: "fit-content"}}>
                <Card.Body>
                    <Card.Title>This is my Pet project called "Proman"</Card.Title>
                    <p>The name came from one of the Teamwork project, that I did during my course at CodeCool.</p>
                </Card.Body>
            </Card>

            <Card className={"d-flex flex-column align-content-center  align-items-center"}
                  style={{width: "fit-content"}}>
                <Card.Body>
                    <Card.Title>This Website is a TO-DO list making application where you can:</Card.Title>
                    <br/>
                    <ul>
                        <li>Register and Login as new User.</li>
                        <li>Login as Guest, Boards visible to everybody.</li>
                        <li>Create Board for projects.</li>
                        <li>Create Columns in the Board, representing the different states.</li>
                        <li>Create Cards in Columns, representing the Things need to do.</li>
                    </ul>
                </Card.Body>
            </Card>
            <Card className={"d-flex flex-column align-content-center  align-items-center"}
                  style={{width: "fit-content"}}>
                <Card.Body>
                    <Card.Title>I'm constantly working on it, so it is possible to find bugs or not working
                        features.</Card.Title>
                    My goal is to understand and deepen my knowledge
                    about React
                </Card.Body>
            </Card>
        </div>);
}