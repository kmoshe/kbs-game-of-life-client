import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import StyledCell from '../../components/cell/Cell';
import { GenerationWrapper, GenerationBody } from '../../components/generationWrapper/GenerationWrapper';
import GenerationRow from '../../components/generationRow/GenerationRow';
import { Generation } from '../../models/generation';
import { computeNextGeneration, selectGeneration, selectIsWipedOut } from '../../store/gameOfLifeSlice';
import Button from '../../components/button/Button';

const GameOfLife = () => {
    const dispatch = useAppDispatch();
    const [advanceGeneration, setAdvanceGeneration] = useState<boolean>(false);
    const [delay, setDelay] = useState<number>(500)
    
    const generation = useAppSelector(selectGeneration);
    const isWipedOut = useAppSelector(selectIsWipedOut);

    useEffect(() => {
        dispatch(computeNextGeneration({ rows: 50, columns: 50, generation: [] }));
    }, [dispatch]);

    useEffect(() => {
        if (isWipedOut) {
            setAdvanceGeneration(false);
            alert('Population Wiped Out');
        }
    }, [isWipedOut])

    useInterval(() => {
        dispatch(computeNextGeneration({ rows: 50, columns: 50, generation }));
    }, advanceGeneration ? delay : null)

    const onStartClicked = () => {
        setAdvanceGeneration(true);
    }

    const onStopClicked = () => {
        setAdvanceGeneration(false);
    }

    const onIncreaseDelay = () => {
        setDelay(delay + 100);
    }

    const onDecreaseDelay = () => {
        setDelay(delay - 100);
    }

    return (
        <>
            <GenerationWrapper>
                <GenerationBody>
                    {generation.map((generationRow, rowIndex) => 
                        (<GenerationRow key={rowIndex}>{generationRow.map((cellStatus, columnIndex) => <StyledCell key={`${rowIndex}_${columnIndex}`} status={cellStatus} />)}</GenerationRow>)
                    )}
                </GenerationBody>
            </GenerationWrapper>
            <Button onClick={onStartClicked}>Start</Button>
            <Button onClick={onStopClicked}>Stop</Button>
            <Button onClick={onIncreaseDelay}>Increase Delay</Button>
            <Button onClick={onDecreaseDelay}>Decrease Delay</Button>
        </>
    );
}

export default GameOfLife;