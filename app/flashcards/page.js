import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../path/to/your/firebase/config' // Make sure to import your Firebase configuration
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box
} from '@mui/material'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})

  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return

      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      try {
        const docs = await getDocs(colRef)
        const fetchedFlashcards = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setFlashcards(fetchedFlashcards)
      } catch (error) {
        console.error("Error fetching flashcards:", error)
        // You might want to set an error state here and display it to the user
      }
    }
    
    if (isLoaded && isSignedIn) {
      getFlashcard()
    }
  }, [search, user, isLoaded, isSignedIn])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div> // Or any other loading state
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box sx={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}>
                    <div style={{
                      backfaceVisibility: 'hidden',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}>
                      <Typography variant="h5" component="div">
                        {flashcard.front}
                      </Typography>
                    </div>
                    <div style={{
                      backfaceVisibility: 'hidden',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      transform: 'rotateY(180deg)',
                    }}>
                      <Typography variant="h5" component="div">
                        {flashcard.back}
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}