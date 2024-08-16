//home
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      
      {/* Original Next.js template content */}
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        {/* ... (rest of the grid content) */}
      </div>
    </main>
  );
}

//header
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          Flashcard SaaS
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">Login</Button>
          <Button color="inherit" href="/sign-up">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}

//hero
import { Box, Typography, Button } from '@mui/material';

export default function Hero() {
  return (
    <Box sx={{textAlign: 'center', my: 4}}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Flashcard SaaS
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        The easiest way to create flashcards from your text.
      </Typography>
      <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
        Get Started
      </Button>
      <Button variant="outlined" color="primary" sx={{mt: 2}}>
        Learn More
      </Button>
    </Box>
  );
}

//features
import { Box, Typography, Grid } from '@mui/material';

export default function Features() {
  return (
    <Box sx={{my: 6}}>
      <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
      <Grid container spacing={4}>
        {/* Add your feature items here */}
      </Grid>
    </Box>
  );
}

//stripe integration
import { useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { getStripe } from '../utils/stripe-client'; // You'll need to create this utility

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // Add any necessary data here
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const checkoutSession = await response.json();

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{my: 6, textAlign: 'center'}}>
      <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Add your pricing plans here */}
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Subscribe'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}