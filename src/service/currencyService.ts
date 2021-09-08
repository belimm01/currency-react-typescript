export async function processCurrency(currency: string) {
    const result = currency.split(/\r?\n/).map((row, index) => {
        const parse = row.split('|');
        parse.splice(1, 2);
        const rate = parse[2] ? parseFloat(parse[2].replace(',', '.')) : undefined;
        return {
            rate: rate,
            country: parse[0],
            currency: parse[1],
            id: index,
        } as ICurrencyRate;
    });
    result.splice(0, 2);
    return result;
}