 import React, {useCallback, useRef} from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor-item.module.css';
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from 'react-dnd';
 import {DELETE_INGREDIENT_TO_CONSTRUCTOR, MOVE_INGREDIENT_IN_CONSTRUCTOR} from "../../services/actions";
 import {TIngredientData} from "../../utils/types";
 import { Identifier } from 'dnd-core';

interface IPropsBurgerConstructorItem {
     ingredient: TIngredientData;
     index: number
 }

type DragObject = {
     id: string;
     index: number;
}

type CollectedProps = {
     handlerId: Identifier | null
}
const BurgerConstructorItem : React.FC<IPropsBurgerConstructorItem> = ({ingredient, index}) => {

    //Для ревьювера -
    //использовала пример для сортировки https://medium.com/litslink/react-dnd-in-examples-ce509b25839d,
    // адаптировав под хранилище Redux и подключив библиотеку immutability-helper

    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    const id = ingredient._id;
    const [{ isDragging }, drag] = useDrag({
        type: 'items',
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        });
    }, [dispatch])

    const [{ handlerId }, drop] = useDrop<DragObject, undefined, CollectedProps>({
        accept: 'items',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    })

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <li ref={ref} className={`${burgerConstructorStyle.blockItem} p-1`} style={{ opacity }} data-handler-id={handlerId}>
            <span className={"mr-1"}><DragIcon type="primary"/></span>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => {
                    dispatch({
                        type: DELETE_INGREDIENT_TO_CONSTRUCTOR,
                        id: ingredient.uniqId,
                    })
                }}
            />
        </li>
    )
}

export default BurgerConstructorItem;