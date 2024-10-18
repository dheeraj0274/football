import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { MapPin, Play, Pause, RotateCcw, Plus, Minus } from "lucide-react"

export default function FootballScorecard() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [matchStatus, setMatchStatus] = useState('Not Started')
  const [scoreTeam1, setScoreTeam1] = useState(0)
  const [scoreTeam2, setScoreTeam2] = useState(0)

  useEffect(() => {
    let intervalId

    if (isRunning && time < 5400) { // 90 minutes in seconds
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          if (newTime === 5400) {
            setIsRunning(false)
            setMatchStatus('Full Time')
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, time])

  const startTimer = () => {
    setIsRunning(true)
    setMatchStatus('In Progress')
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
    setMatchStatus('Not Started')
    setScoreTeam1(0)
    setScoreTeam2(0)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const incrementScore = (team) => {
    if (team === 'team1') {
      setScoreTeam1((prevScore) => prevScore + 1)
    } else {
      setScoreTeam2((prevScore) => prevScore + 1)
    }
  }

  const decrementScore = (team) => {
    if (team === 'team1') {
      setScoreTeam1((prevScore) => Math.max(0, prevScore - 1))
    } else {
      setScoreTeam2((prevScore) => Math.max(0, prevScore - 1))
    }
  }

  return (
    <div className="bg-black p-8 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center bg-violet-500">
          <CardTitle className="text-2xl font-bold">Football Scorecard</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="text-xl font-bold">{formatTime(time)}</div>
            </div>
            <Badge className={`${matchStatus === 'Full Time' ? 'bg-red-500' : matchStatus === 'In Progress' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
              {matchStatus}
            </Badge>
            <div className="flex items-center space-x-2 text-blue-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Wembley Stadium</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2 mx-auto shadow-lg">
                <span className="text-3xl font-bold text-white">ENG</span>
              </div>
              <h3 className="font-semibold text-blue-600">England</h3>
              <div className="flex justify-center mt-2">
                <Button onClick={() => decrementScore('team1')} className="bg-red-500 hover:bg-red-600 p-1 mr-1">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button onClick={() => incrementScore('team1')} className="bg-green-500 hover:bg-green-600 p-1">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-orange-500">{scoreTeam1} - {scoreTeam2}</div>
              <Badge className="bg-blue-500 text-white">Premier League</Badge>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-2 mx-auto shadow-lg">
                <span className="text-3xl font-bold text-white">GER</span>
              </div>
              <h3 className="font-semibold text-orange-500">Germany</h3>
              <div className="flex justify-center mt-2">
                <Button onClick={() => decrementScore('team2')} className="bg-red-500 hover:bg-red-600 p-1 mr-1">
                  <Minus className="h-4 w-4" />
                </Button>
                <Button onClick={() => incrementScore('team2')} className="bg-green-500 hover:bg-green-600 p-1">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            {!isRunning ? (
              <Button onClick={startTimer} className="bg-green-500 hover:bg-green-600">
                <Play className="mr-2 h-4 w-4" /> Start
              </Button>
            ) : (
              <Button onClick={pauseTimer} className="bg-yellow-500 hover:bg-yellow-600">
                <Pause className="mr-2 h-4 w-4" /> Pause
              </Button>
            )}
            <Button onClick={resetTimer} className="bg-red-500 hover:bg-red-600">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}