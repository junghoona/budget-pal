import { TransactionBudget } from "../index";

function TransactionTable({
    id, date, price, description
}) {
    const time = new Date(date);
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    return (
        <tbody>
            <tr className="h-3" />
            <tr 
                className="focus:outline-none h-16 
                bg-white border border-gray-200 rounded"
            >
                <td>
                    <div className="pl-20">
                        <p className="text-base font-medium 
                        leading-none text-gray-500">
                            {description}
                        </p>
                    </div>
                </td>
                <td class="pl-24">
                    <div className="flex items-center">
                        <TransactionBudget id={id} />
                    </div>
                </td>
                <td class="pl-24">
                    <div className="flex items-center">
                        <p className="text-sm leading-none
                        text-gray-500 ml-2">
                            {time.toLocaleDateString("en-US", dateOptions)}
                        </p>
                    </div>
                </td>
                <td class="pl-24">
                    <div className="flex items-center">
                        <p className="text-sm leading-none 
                        text-teal-500 ml-2">
                            ${price}.00
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default TransactionTable;