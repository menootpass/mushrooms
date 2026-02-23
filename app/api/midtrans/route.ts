import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { items, total } = body

        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: total,
            },
            item_details: items.map((item: { name: string; price: number; quantity: number }) => ({
                id: item.name.toLowerCase().replace(/\s+/g, '-'),
                price: item.price,
                quantity: item.quantity,
                name: item.name.substring(0, 50),
            })),
            customer_details: {
                first_name: 'Customer',
                email: 'customer@example.com',
            },
        }

        const serverKey = process.env.MIDTRANS_SERVER_KEY
        if (!serverKey) {
            return NextResponse.json({ error: 'Midtrans server key not configured' }, { status: 500 })
        }

        const authString = Buffer.from(`${serverKey}:`).toString('base64')

        const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify(parameter),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Midtrans error:', data)
            return NextResponse.json({ error: 'Failed to create transaction', details: data }, { status: 500 })
        }

        return NextResponse.json({ token: data.token, redirect_url: data.redirect_url })
    } catch (error) {
        console.error('Midtrans API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
