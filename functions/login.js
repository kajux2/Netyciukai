const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { username, password } = JSON.parse(event.body || '{}');
    if (!username || !password) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Username and password are required' }) };
    }
    const { data, error } = await supabase.from('users').select('*').eq('username', username).eq('password', password);
    if (error || data.length === 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }
    return { statusCode: 200, body: JSON.stringify(data[0]) };
};