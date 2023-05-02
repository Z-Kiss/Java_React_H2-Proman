import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function WelcomeModal({handleClose}) {



    return (<>
            <Modal.Header closeButton>
                <Modal.Title>Welcome Visitor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This is my Pet project called "Proman"<br/><br/>
                The name came from one of the Teamwork project,<br/>
                that I did during my course at CodeCool.
                <br/><br/>
                This Website is a TO-DO list making application where you can:<br/><br/>
                - Create Board for projects,<br/>
                - Create Columns in the Board, representing the different states,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;like ToDo, In progress, Done<br/>
                - Create Cards in Columns, representing the Things need to do<br/>
                - Register and Login as User to create Boards, for yourself<br/>
                &nbsp;&nbsp;&nbsp;(not necessary to use valid email address at the moment)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;or create Boards as Guest, that visible to everybody.<br/>
                <br/><br/>
                I'm constantly working on it, so it is possible to find bugs or not working features.
                My goal is to understand and deepen my knowledge
                about React
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </>
    )
}
