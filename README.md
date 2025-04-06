# **Where's Waldo?** 🔍  
*A fun and interactive game where players race to find hidden characters in a detailed image.*  

## **Table of Contents**  
- [Features](#features)  
- [Demo](#demo)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  
- [License](#license)  

## **Features**  
✅ Find characters hidden in a complex image  
✅ Track your **completion time** and **score**  
✅ Responsive design that works on all devices  
✅ Animated feedback for correct/incorrect clicks  
✅ Dynamic leaderboard to track top players  
✅ Backend with secure score submission and validation  

## **Demo**  
🔗 **Live Demo:** [Where's Waldo Game](https://your-waldo-game.netlify.app)  
🔗 **Backend Repo:** [Where's Waldo Backend](https://github.com/Track404/WheresWaldo-Backend)  

📸 **Screenshots:**  
![Waldo Game Interface](/src/assets/screenShot.png)  

## **Installation**  
Clone the repository and install dependencies:  
```sh
git clone https://github.com/yourusername/waldo-game.git  
cd waldo-game  
npm install  
npm run dev  
```

### **Backend Setup**  
Create a `.env` file in the root directory and configure the following:
```env
DATABASE_URL=your_postgresql_database_url  
JWT_SECRET=your_jwt_secret  
```

Run database migrations (if applicable):  
```sh
npm run migrate
```

Start the backend server:  
```sh
npm run server
```

## **Usage**  
1. Click Start Game to begin.  
2. Search the image and click when you spot a character.  
3. Get instant feedback on your guess.  
4. Submit your time to the leaderboard.  
5. Try to beat your best score or challenge friends!  

## **Technologies**  
🛠 **Frontend:** React, TailwindCSS  
🧠 **State Management:** React Context  
🖼️ **Image Handling:** Custom hitbox-based detection  
🚀 **Backend:** Node.js, Express.js  
🛢 **Database:** PostgreSQL  
📡 **API Type:** REST  

## **Contributing**  
Contributions are welcome! Feel free to open an issue or submit a pull request.  

1. Fork the repository
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "add: new feature"`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## **License**  
📜 MIT License - See the [LICENSE](LICENSE) file for details.
