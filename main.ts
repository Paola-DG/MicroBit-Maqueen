function turnLeft () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(400)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 48)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 48)
    basic.pause(400)
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(400)
}
function atObstacle () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 12) {
        return 1
    } else {
        return 0
    }
}
function atIntersection () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        return 1
    } else {
        return 0
    }
}
input.onButtonPressed(Button.A, function () {
    run = 1
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
})
function trackLine () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 68)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    }
}
function turnRight () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(400)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 48)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 48)
    basic.pause(400)
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(400)
}
input.onButtonPressed(Button.B, function () {
    run = 0
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
})
let run = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P15, 24, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Red))
run = 0
basic.forever(function () {
    if (run == 0) {
        maqueen.motorStop(maqueen.Motors.All)
    } else if (run == 1) {
        trackLine()
        if (atIntersection() == 1) {
            turnLeft()
            if (atObstacle() == 1) {
                turnRight()
                run = 2
            } else {
                run = 3.1
            }
        }
    } else if (run == 2) {
        trackLine()
        if (atIntersection() == 1) {
            turnLeft()
            if (atObstacle() == 1) {
                turnRight()
                run = 5.6
            } else {
                run = 3.2
            }
        }
    } else if (run == 3.1) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
            run = 6.5
        }
    } else if (run == 3.2) {
        trackLine()
        if (atIntersection() == 1) {
            turnLeft()
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
            run = 5.5
        }
    } else if (run == 4) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
            run = 5
        }
    } else if (run == 5) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
            run = 6
        }
    } else if (run == 6) {
        trackLine()
        if (atIntersection() == 1) {
            turnRight()
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            run = 7
        }
    } else if (run == 7) {
        trackLine()
        if (atIntersection() == 1) {
            maqueen.motorStop(maqueen.Motors.All)
            basic.pause(1000)
            if (atObstacle() == 1) {
                turnLeft()
                run = 9
            } else {
                strip.showColor(neopixel.colors(NeoPixelColors.Blue))
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
                basic.pause(500)
                maqueen.motorStop(maqueen.Motors.All)
                basic.pause(200)
                run = 8
            }
        }
    } else if (run == 8) {
        trackLine()
        if (atIntersection() == 1) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
            basic.pause(500)
            maqueen.motorStop(maqueen.Motors.All)
            basic.pause(200)
            run = 10
        }
    } else if (run == 9) {
        trackLine()
        if (atIntersection() == 1) {
            turnLeft()
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            run = 10
        }
    } else if (run == 10) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        trackLine()
        if (atIntersection() == 1) {
            run = 11
        }
    } else if (run == 6.5) {
        trackLine()
        if (atIntersection() == 1) {
            turnLeft()
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            run = 6
        }
    } else if (run == 11) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            run = 0
        }
    } else if (run == 5.5) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            run = 4
        }
    } else if (run == 5.6) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            run = 5.67
        }
    } else if (run == 5.67) {
        trackLine()
        if (atIntersection() == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            run = 5.5
        }
    }
})
