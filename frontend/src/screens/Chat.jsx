import {Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Chat = () => {
    const { id } = useParams()

  return (
    <div>
        <Row style={{marginLeft: '20px', marginRight: '20px'}}>
            <Col md={6} style={{border: '2px solid Blue'}}>
                <p> Here You wil give the doctor's Information</p>
                <p> Remember The Id in the params belongs to the doctor use it : {id}</p>

            </Col>
            <Col md={6} style={{border: '2px solid red'}}>
                <p>Here is where the conversation will take place</p>
                <p>Typically a message Box and Button at the bottom and send button</p>
                

            </Col>
        </Row>
    </div>
  )
}

export default Chat