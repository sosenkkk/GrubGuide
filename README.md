# Grub Guide

**Check out the live website [here](https://iiits-sosenkkk.vercel.app/).**

Grub Guide is a sleek and intuitive web application designed to help users discover the best restaurants in their area. Built with modern web technologies, it provides a seamless experience with both light and dark modes, ensuring a visually appealing interface for all users.


## Features

- **Beautiful UI**: A polished and user-friendly interface with support for both dark and light modes.
- **Restaurant Data**: Pulls restaurant data from Zomato, ensuring a variety of dining options.
- **Location-Based Search**: Find restaurants near your location or explore new areas.
- **Filter Options**: Search and filter restaurants by cuisine, location, and more.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - A React framework for building fast, user-friendly web applications.
- **Backend**: [Node.js](https://nodejs.org/) - A JavaScript runtime for building scalable server-side applications.
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- **Maps**: [Leaflet](https://leafletjs.com/) - A powerful library for interactive maps.

## Running the Project

Follow these steps to get Grub Guide up and running on your local machine:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.x)
- npm (>=6.x) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

2. **Install dependencies** for both the client and server:

    ```bash
    # Install server dependencies
    cd Server
    npm install

    # Install client dependencies
    cd ../Client
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root of the `server` folder and add your environment variables


### Running the Application

1. **Start the backend server**:

    ```bash
    cd Server
    npm run start
    ```

2. **Start the frontend development server**:

    ```bash
    cd ../Client
    npm run dev
    ```

3. Open your browser and go to `http://localhost:3000` to see Grub Guide in action.
