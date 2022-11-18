import burgerConstructorEmptyStyle from "../burger-constructor-empty/burger-constructor-empty.module.css";
import React from "react";

export default function BurgerConstructorEmpty ()  {
    return (
        <>
            <div className={burgerConstructorEmptyStyle.emptyConstructorMessage}>
                <div className={burgerConstructorEmptyStyle.emptyConstructorMessageRow}>
                    <div className={burgerConstructorEmptyStyle.emptyConstructorMessageCol}>
                        <p className="text text_type_main-default text_color_inactive pb-2">
                            Здесь пусто.
                        </p>
                    </div>
                </div>
                <div className={burgerConstructorEmptyStyle.emptyConstructorMessageRow}>
                    <div className={burgerConstructorEmptyStyle.emptyConstructorMessageCol}>
                        <p className="text text_type_main-default text_color_inactive pb-2">
                            Выберите ингредиенты для бургера, перетащив их карточку сюда.
                        </p>
                    </div>
                </div>
                <div className={burgerConstructorEmptyStyle.emptyConstructorMessageRow}>
                    <div className={burgerConstructorEmptyStyle.emptyConstructorMessageCol}>
                        <p className="text text_type_main-default text_color_inactive pb-2">
                            Не забудьте, добавить булки!
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
