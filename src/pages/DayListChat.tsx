//SignaLR подклбчение  (Сделать чат на SignalR)
import axios from "axios";
import {  useEffect, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useURL } from "../components/useURL";
import RefreshAccessToken from "../hook/getAccTok";

   /*
    const connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7051/SendMessage") // здесь указывается URL хаба на сервере
    .withAutomaticReconnect()
    .build();
     
    connection.start().then(() => {
      console.log("Connection started");
      connection.invoke("SendMessage", message);
      connection.on("Receive", (message) => {
        console.log(`Received message: ${message}`);
      });
  }).catch(error => {
      console.error(error);
  });
  
  connection.onreconnected(() => {
      console.log("Connection reestablished");
      connection.invoke("SendMessage", "Hello again from client");
  });
  */
  interface DayData {
    
    whatNewinDay: string;
    newKnoledge: string;
    dayPhilosophy: string;
    whatDone: string;
    whatNotDone: string;
    сonclusions: string;
    day: number;
    date: string
  }


  export function DayList(){

    //функция для получения листа дней с их данными
    
    const navigate=useNavigate();
    const baseUrl=useURL();
    const Id=localStorage.getItem('userId');
    const token=localStorage.getItem('token');
    const [cardsData, setCardsData] = useState<DayData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inOut, setinOut]=useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      
      }).format(date);
    };


    useEffect(  () => {  
      
     // console.log('Отслеживание обновления сраницы\n');              
       // setEndFix(true);   
       const checkUser = async ()=>   {
       const result = await RefreshAccessToken(inOut);
        if (result !== undefined) {
          setinOut(result);
          if (!result) {
            navigate('/login', { replace: true });
          }
        }
      }
      checkUser();
       const getDaylist = async (Id: string | null)=>   {
      
                       // RefreshAccessToken();                    
      try {      
        const headers = {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовки запроса
        };
      
           const response = await  axios.get(`${baseUrl}/GetListDay/GetListD`,           
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }, 
              params: {
                userId: Id,
              },            
            }
            
          );  
          const formattedData = response.data.map((item: DayData)  => ({
            day: item.day,
            whatNewinDay: item.whatNewinDay,
            newKnoledge: item.newKnoledge,
            dayPhilosophy: item.dayPhilosophy,
            whatDone: item.whatDone,
            whatNotDone: item.whatNotDone,
            сonclusions: item.сonclusions,
            date: formatDate(item.date),
            // Добавьте остальные поля, если нужно
          }));
          setCardsData(formattedData);
          setIsLoading(false);
          console.log(response);  
          console.log(cardsData);            
      }catch(error){

        
      }
      
    }
    getDaylist(Id);
    
    }, []);

    
    useEffect(() => {
      console.log("Updated cardsData:", cardsData);
    
      // Здесь можно выполнить дополнительную логику, которая использует данные из cardsData
    
    }, [cardsData]);

    if (isLoading) {
      return <div>Loading...</div>; // Или другой индикатор загрузки
    }
    return(
<>
<div className="pagination" style={{marginLeft: "7%" }}>
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="pagination-button text-warning" style={{backgroundColor: "indigo",  width:"10%", minHeight:"100vh"}}
  >
    <h1>&lt;</h1>
  </button>
  <div className="pagination-center">
    <Container className="font-weight-bold" style={{backgroundColor: "#733c09", height: "100%", width: "90%", paddingLeft:"2%", paddingRight: "2%" }}>
      {/* Первый ряд карточек */}
      <Row>
        {cardsData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((card, index) => (
            <Col className="mt-4" key={index} xs={12} md={4}>
              <Card>
                {/* Содержимое карточки */}
                <Card.Body>
                  <Card.Title style={{color: "indigo"}}>День: {card.day}</Card.Title>
                  <Card.Text><h6 style={{color: "blue"}}>Что хотелось бы узнать или сделать за день:</h6> {card.whatNewinDay}</Card.Text>
                  <Card.Text><h6 style={{color: "blue"}}> Записать новое знание обретённое за день:</h6> {card.newKnoledge}</Card.Text>
                  <Card.Text><h6 style={{color: "blue"}}>Мудрость дня: </h6> {card.dayPhilosophy}</Card.Text>
                  <Card.Text><h6 style={{color: "blue"}}>Что получилось: </h6>{card.whatDone}</Card.Text>
                  <Card.Text><h6 style={{color: "blue"}}>Что не получилось: </h6>{card.whatNotDone}</Card.Text>
                  <Card.Text><h6 style={{color: "blue"}}>Выводы: </h6>{card.сonclusions}</Card.Text>
                  <Card.Text><h6 style={{color: "blue"}}>Дата: </h6>{card.date}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>     
    </Container>
  </div>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === Math.ceil(cardsData.length / itemsPerPage)}
    className="pagination-button text-warning" style={{backgroundColor: "indigo", width:"10%", minHeight:"100vh"}}
  >
   <h1>&gt;</h1>
  </button>
</div>
</>
)
};

