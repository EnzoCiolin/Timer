import { useContext, useEffect, useState } from 'react';
import {ContDownContainer, Separator} from './styles';
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../contexts/CyclesContext';


export function Countdown(){
    const {activeCycle, MarkCurrentCycleAsFinished,amountSecondsPassed,setSecondsPassed} = useContext(CyclesContext)
    const {activeCycleId} = useContext(CyclesContext)
    

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {

        let interval: number;

        if(activeCycle){
            interval = setInterval(() => {

                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    new Date(activeCycle.startDate)
                )

                if(secondsDifference >= totalSeconds){
                    MarkCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }
                },1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed ,MarkCurrentCycleAsFinished])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60)
    const SecondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(SecondsAmount).padStart(2, '0')

    useEffect(() => {
       if(activeCycle) {
        document.title = `${minutes}:${seconds}`
       }
    },[minutes, seconds,activeCycle])

    return (
        <ContDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </ContDownContainer>
    )
}