import { Calendar, ArrowUpAZ, ArrowDownZA, Filter } from "lucide-react";
import ButtonWithIcon from "./ButtonWithIcon";
import { useState } from "react";

export default function FilterOptions() {
    const [isAlphaOrderUp, setAlphaOrder] = useState(true);

    function changeButtonOrder() {
        setAlphaOrder((prev) => !prev);
    }

    return (
        <div className="flex gap-1">
            <ButtonWithIcon label="Data">
                <Calendar className="h-5 mr-1" style={{ color: 'var(--highlight)' }} />
            </ButtonWithIcon>
            <ButtonWithIcon onClick={changeButtonOrder} label={isAlphaOrderUp ? "A-Z" : "Z-A"}>
                {isAlphaOrderUp ? (
                    <ArrowUpAZ className="h-5 text-white mr-1" style={{ color: 'var(--highlight)' }} />
                ) : (
                    <ArrowDownZA className="h-5 text-white mr-1" style={{ color: 'var(--highlight)' }} />
                )}
            </ButtonWithIcon>
            <ButtonWithIcon label="Filtros">
                <Filter className="h-5 mr-1" style={{ color: 'var(--highlight)' }} />
            </ButtonWithIcon>
        </div>
    )
}