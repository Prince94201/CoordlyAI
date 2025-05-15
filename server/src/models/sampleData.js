/**
 * Sample data for Business Intelligence AI Data Agent
 * Includes intentionally challenging data to test the AI's capabilities
 */

const { format } = require('date-fns');

/**
 * Generate random date within a range
 * @param {Date} start Start date
 * @param {Date} end End date
 * @returns {Date} Random date within range
 */
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Format date in various inconsistent formats
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
function formatInconsistentDate(date) {
    const formats = [
        'yyyy-MM-dd',
        'MM/dd/yyyy',
        'M/d/yyyy',
        'yyyy/MM/dd',
        'dd-MM-yyyy',
        'MMM d, yyyy'
    ];
    
    const formatIndex = Math.floor(Math.random() * formats.length);
    return format(date, formats[formatIndex]);
}

/**
 * Generate random string
 * @param {number} length Length of string
 * @returns {string} Random string
 */
function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Sample data generation
const generateSampleData = () => {
    // Products data
    const products = [];
    const categories = ['Electronics', 'ELEC', 'Clothing', 'CLO', 'Grocery', 'GRO', 'Home', 'HOM', 'Toys', 'TOY'];
    const subCategories = ['Premium', 'Standard', 'Budget', 'PREM', 'STD', 'BUDG'];
    const suppliers = ['GlobalSupply', 'EastVendors', 'WestDistribution', 'NorthGoods', 'SouthImports'];
    const inventoryStatus = ['In Stock', 'Low', 'Out', 'Backorder', 'Discontinued', 'IS', 'LO', 'OO', 'BO', 'DC'];
    
    for (let i = 1; i <= 50; i++) {
        const categoryIndex = Math.floor(Math.random() * (categories.length / 2)) * 2; // Pair matching for consistent mapping
        const subCategoryIndex = Math.floor(Math.random() * (subCategories.length / 2)) * 2;
        
        const price = Math.round((10 + Math.random() * 990) * 100) / 100;
        const cost = Math.round((price * (0.4 + Math.random() * 0.3)) * 100) / 100;
        
        products.push({
            pid: `P${i.toString().padStart(3, '0')}`,
            name: `Product ${i}`,
            cat: categories[categoryIndex + Math.floor(Math.random() * 2)], // Sometimes abbreviated
            sub_cat: subCategories[subCategoryIndex + Math.floor(Math.random() * 2)], // Sometimes abbreviated
            p: price, // Unclear column name for price
            cost: cost,
            supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
            x1: inventoryStatus[Math.floor(Math.random() * inventoryStatus.length)] // Poorly named inventory status
        });
    }
    
    // Stores data
    const stores = [];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
    const regions = ['East', 'West', 'Central', 'South', 'North'];
    const managerNames = ['John Smith', 'Maria Garcia', 'Robert Johnson', 'Lisa Brown', 'Michael Davis', 'JS', 'MG', 'RJ', 'LB', 'MD'];
    
    for (let i = 1; i <= 20; i++) {
        const cityIndex = Math.floor(Math.random() * cities.length);
        const useFull = Math.random() > 0.5;
        
        // Inconsistent location formatting
        const location = useFull ? `${cities[cityIndex]}, ${states[cityIndex]}` : cities[cityIndex];
        
        // Sometimes initials, sometimes full name
        const managerIndex = Math.floor(Math.random() * (managerNames.length / 2));
        const manager = Math.random() > 0.5 ? managerNames[managerIndex] : managerNames[managerIndex + 5];
        
        stores.push({
            str_id: `S${i.toString().padStart(2, '0')}`,
            loc: location,
            sz: Math.floor(1000 + Math.random() * 9000), // Size with no units specified (sq ft)
            mgr: manager,
            opened: formatInconsistentDate(randomDate(new Date(2010, 0, 1), new Date(2023, 11, 31))),
            region: regions[Math.floor(Math.random() * regions.length)]
        });
    }
    
    // Customers data
    const customers = [];
    const segments = ['A1', 'B2', 'C3', 'D4', 'Premium', 'Standard', 'Budget', 'Elite'];
    const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    
    for (let i = 1; i <= 200; i++) {
        const useFullName = Math.random() > 0.5;
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = useFullName ? `${firstName} ${lastName}` : lastName;
        
        customers.push({
            cid: `C${i.toString().padStart(3, '0')}`,
            name: name,
            since: formatInconsistentDate(randomDate(new Date(2010, 0, 1), new Date(2023, 11, 31))),
            seg: segments[Math.floor(Math.random() * segments.length)],
            val: Math.round((100 + Math.random() * 9900) * 100) / 100, // Customer lifetime value
            churn_risk: Math.round(Math.random() * 100) / 100 // Churn risk with no scale indication
        });
    }
    
    // Sales data
    const sales = [];
    const paymentMethods = ['Credit Card', 'CC', 'Cash', 'CASH', 'Debit', 'DB', 'PayPal', 'PP', 'AMEX', 'American Express'];
    
    for (let i = 1; i <= 2000; i++) {
        const productIndex = Math.floor(Math.random() * products.length);
        const customerIndex = Math.floor(Math.random() * customers.length);
        const storeIndex = Math.floor(Math.random() * stores.length);
        const quantity = Math.floor(1 + Math.random() * 10);
        const amount = Math.round((products[productIndex].p * quantity) * 100) / 100;
        
        // Inconsistent discount format (sometimes %, sometimes amount)
        const usePercentage = Math.random() > 0.5;
        const discountValue = Math.round(Math.random() * 30);
        const discount = usePercentage ? `${discountValue}%` : discountValue.toFixed(2);
        
        const paymentIndex = Math.floor(Math.random() * (paymentMethods.length / 2)) * 2;
        const payment = paymentMethods[paymentIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        sales.push({
            tr_id: `T${i.toString().padStart(4, '0')}`,
            dt: formatInconsistentDate(randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31))),
            cid: customers[customerIndex].cid,
            pid: products[productIndex].pid,
            qty: quantity,
            amt: amount,
            str_id: stores[storeIndex].str_id,
            pymt: payment,
            dscnt: discount
        });
    }
    
    // Customer interactions data
    const customerInteractions = [];
    const interactionTypes = ['Phone Call', 'PH', 'Email', 'EM', 'Chat', 'CH', 'In-Store', 'IS', 'Social Media', 'SM'];
    const agents = ['Alex K.', 'Sarah T.', 'Michael P.', 'Jessica R.', 'Brian L.'];
    
    for (let i = 1; i <= 500; i++) {
        const customerIndex = Math.floor(Math.random() * customers.length);
        const typeIndex = Math.floor(Math.random() * (interactionTypes.length / 2)) * 2;
        const type = interactionTypes[typeIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        // Inconsistent rating scale (sometimes 1-5, sometimes 1-10)
        const useScale5 = Math.random() > 0.5;
        const rating = useScale5 ? Math.floor(1 + Math.random() * 5) : Math.floor(1 + Math.random() * 10);
        
        customerInteractions.push({
            cid: customers[customerIndex].cid,
            type: type,
            ts: formatInconsistentDate(randomDate(new Date(2022, 0, 1), new Date(2023, 11, 31))),
            dur: Math.round((1 + Math.random() * 59) * 10) / 10, // Duration with no units (minutes)
            notes: `Customer ${Math.random() > 0.5 ? 'inquiry' : 'complaint'} about ${Math.random() > 0.5 ? 'product' : 'service'}.`,
            agent: agents[Math.floor(Math.random() * agents.length)],
            rating: rating
        });
    }
    
    // Marketing campaigns data
    const campaigns = [];
    const campaignNames = ['Summer Sale', 'Holiday Special', 'Back to School', 'Black Friday', 'New Customer', 'Loyalty Rewards', 'Product Launch', 'Clearance'];
    const channels = ['Email', 'Social Media', 'TV', 'Radio', 'Print', 'SMS', 'Display Ads', 'Search Ads'];
    const KPIs = ['ROI', 'CPA', 'CTR', 'Conv', 'Engagement', 'ENG', 'Reach', 'RCH'];
    
    for (let i = 1; i <= 30; i++) {
        const startDate = randomDate(new Date(2020, 0, 1), new Date(2023, 6, 1));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(7 + Math.random() * 30)); // 1-5 weeks duration
        
        campaigns.push({
            camp_id: `C${i.toString().padStart(2, '0')}`,
            name: `${campaignNames[Math.floor(Math.random() * campaignNames.length)]} ${i}`,
            st_dt: formatInconsistentDate(startDate),
            end_dt: formatInconsistentDate(endDate),
            bgt: Math.round((1000 + Math.random() * 9000) * 100) / 100, // Budget with no currency indicator
            channel: channels[Math.floor(Math.random() * channels.length)],
            target_seg: segments[Math.floor(Math.random() * segments.length)],
            KPI: KPIs[Math.floor(Math.random() * KPIs.length)]
        });
    }
    
    // Campaign results data
    const campaignResults = [];
    const metrics = ['Revenue', 'REV', 'Conversions', 'CONV', 'Click-Through Rate', 'CTR', 'Cost per Acquisition', 'CPA', 'Return on Ad Spend', 'ROAS', 'Impressions', 'IMP'];
    
    for (let i = 1; i <= 200; i++) {
        const campaignIndex = Math.floor(Math.random() * campaigns.length);
        const metricIndex = Math.floor(Math.random() * (metrics.length / 2)) * 2;
        const metric = metrics[metricIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        campaignResults.push({
            camp_id: campaigns[campaignIndex].camp_id,
            metric: metric,
            val: Math.round((10 + Math.random() * 990) * 100) / 100,
            dt: formatInconsistentDate(randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)))
        });
    }
    
    // Financial data
    const financialData = [];
    const departments = ['Marketing', 'Sales', 'Operations', 'HR', 'IT', 'Finance', 'Research', 'Development'];
    const expenseTypes = ['Salary', 'SAL', 'Marketing Expense', 'MKTG', 'Office Supplies', 'SUPP', 'Travel', 'TRV', 'Software', 'SW', 'Equipment', 'EQUIP'];
    const periods = [];
    
    // Generate periods - mix of months and quarters
    for (let year = 2020; year <= 2023; year++) {
        for (let month = 0; month < 12; month++) {
            // Month format (Jan 2020)
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            periods.push(`${monthNames[month]} ${year}`);
            
            // Quarter format (Q1 2020) - add only once per quarter
            if (month % 3 === 0) {
                const quarter = Math.floor(month / 3) + 1;
                periods.push(`Q${quarter} ${year}`);
            }
        }
    }
    
    for (let i = 1; i <= 500; i++) {
        const department = departments[Math.floor(Math.random() * departments.length)];
        const typeIndex = Math.floor(Math.random() * (expenseTypes.length / 2)) * 2;
        const type = expenseTypes[typeIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        const budget = Math.round((1000 + Math.random() * 49000) * 100) / 100;
        const actual = Math.round((budget * (0.8 + Math.random() * 0.4)) * 100) / 100; // 80-120% of budget
        const variance = actual - budget;
        
        financialData.push({
            period: periods[Math.floor(Math.random() * periods.length)],
            department: department,
            type: type,
            actual: actual,
            budget: budget,
            variance: variance,
            notes: Math.random() > 0.7 ? `Variance due to ${Math.random() > 0.5 ? 'increased' : 'decreased'} activity` : null
        });
    }
    
    // Operational expenses
    const operationalExpenses = [];
    const expenseCategories = ['Office Supplies', 'OS', 'Utilities', 'UT', 'Rent', 'RT', 'Insurance', 'INS', 'Maintenance', 'MNT', 'Travel', 'TVL', 'Training', 'TRN'];
    const approvers = ['John Manager', 'Sarah Director', 'Michael VP', 'JM', 'SD', 'MVP'];
    const statuses = ['Approved', 'APP', 'Pending', 'PND', 'Rejected', 'REJ', 'Review', 'RVW'];
    
    for (let i = 1; i <= 300; i++) {
        const categoryIndex = Math.floor(Math.random() * (expenseCategories.length / 2)) * 2;
        const category = expenseCategories[categoryIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        const approverIndex = Math.floor(Math.random() * (approvers.length / 2));
        const approver = approvers[approverIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        const statusIndex = Math.floor(Math.random() * (statuses.length / 2)) * 2;
        const status = statuses[statusIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        operationalExpenses.push({
            dt: formatInconsistentDate(randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31))),
            cat: category,
            amount: Math.round((100 + Math.random() * 9900) * 100) / 100,
            dept_code: `D${Math.floor(Math.random() * 10)}`,
            approved_by: approver,
            status: status
        });
    }
    
    // Employees data
    const employees = [];
    const roles = ['Manager', 'Associate', 'Director', 'Specialist', 'Analyst', 'Coordinator', 'Representative', 'Supervisor'];
    const departments2 = ['Sales', 'Marketing', 'Finance', 'HR', 'Operations', 'IT', 'Customer Service', 'R&D'];
    const statuses2 = ['Active', 'On Leave', 'Terminated', 'Probation', 'ACT', 'OL', 'TERM', 'PROB'];
    const salaryBands = ['L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4', 'S5'];
    
    for (let i = 1; i <= 100; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        const role = roles[Math.floor(Math.random() * roles.length)];
        const department = departments2[Math.floor(Math.random() * departments2.length)];
        
        const statusIndex = Math.floor(Math.random() * (statuses2.length / 2)) * 2;
        const status = statuses2[statusIndex + Math.floor(Math.random() * 2)]; // Sometimes abbreviated
        
        employees.push({
            emp_id: `E${i.toString().padStart(3, '0')}`,
            name: `${firstName} ${lastName}`,
            dept: department,
            role: role,
            joined: formatInconsistentDate(randomDate(new Date(2015, 0, 1), new Date(2023, 11, 31))),
            salary_band: salaryBands[Math.floor(Math.random() * salaryBands.length)],
            manager: i > 10 ? `E${Math.floor(Math.random() * 10).toString().padStart(3, '0')}` : null,
            status: status
        });
    }
    
    // Performance data
    const performance = [];
    const periodFormats = ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', '2022 H1', '2022 H2', '2023 H1', '2023 H2'];
    
    for (let i = 1; i <= 300; i++) {
        const employeeIndex = Math.floor(Math.random() * employees.length);
        
        performance.push({
            emp_id: employees[employeeIndex].emp_id,
            period: periodFormats[Math.floor(Math.random() * periodFormats.length)],
            rating: Math.floor(1 + Math.random() * 5),
            comments: Math.random() > 0.3 ? `Performance ${Math.random() > 0.5 ? 'exceeds' : 'meets'} expectations` : null,
            goals_met: Math.round(Math.random() * 100) / 100, // Percentage
            a1: Math.round((0.7 + Math.random() * 0.3) * 100) / 100, // Attendance - poorly named
            p1: Math.round((0.6 + Math.random() * 0.4) * 100) / 100 // Productivity - poorly named
        });
    }
    
    return {
        products,
        stores,
        customers,
        sales,
        customerInteractions,
        campaigns,
        campaignResults,
        financialData,
        operationalExpenses,
        employees,
        performance
    };
};

/**
 * Generate INSERT statements for all tables
 * @param {Object} data Generated sample data
 * @returns {Array} Array of INSERT statements
 */
const generateInsertStatements = (data) => {
    const insertStatements = [];
    
    // Products
    data.products.forEach(product => {
        insertStatements.push(`INSERT INTO products (pid, name, cat, sub_cat, p, cost, supplier, x1) 
        VALUES ('${product.pid}', '${product.name}', '${product.cat}', '${product.sub_cat}', ${product.p}, ${product.cost}, '${product.supplier}', '${product.x1}');`);
    });
    
    // Stores
    data.stores.forEach(store => {
        insertStatements.push(`INSERT INTO stores (str_id, loc, sz, mgr, opened, region) 
        VALUES ('${store.str_id}', '${store.loc}', ${store.sz}, '${store.mgr}', '${store.opened}', '${store.region}');`);
    });
    
    // Customers
    data.customers.forEach(customer => {
        insertStatements.push(`INSERT INTO customers (cid, name, since, seg, val, churn_risk) 
        VALUES ('${customer.cid}', '${customer.name}', '${customer.since}', '${customer.seg}', ${customer.val}, ${customer.churn_risk});`);
    });
    
    // Sales
    data.sales.forEach(sale => {
        insertStatements.push(`INSERT INTO sales_data (tr_id, dt, cid, pid, qty, amt, str_id, pymt, dscnt) 
        VALUES ('${sale.tr_id}', '${sale.dt}', '${sale.cid}', '${sale.pid}', ${sale.qty}, ${sale.amt}, '${sale.str_id}', '${sale.pymt}', '${sale.dscnt}');`);
    });
    
    // Customer Interactions
    data.customerInteractions.forEach(interaction => {
        insertStatements.push(`INSERT INTO customer_interactions (cid, type, ts, dur, notes, agent, rating) 
        VALUES ('${interaction.cid}', '${interaction.type}', '${interaction.ts}', ${interaction.dur}, '${interaction.notes}', '${interaction.agent}', ${interaction.rating});`);
    });
    
    // Campaigns
    data.campaigns.forEach(campaign => {
        insertStatements.push(`INSERT INTO campaigns (camp_id, name, st_dt, end_dt, bgt, channel, target_seg, KPI) 
        VALUES ('${campaign.camp_id}', '${campaign.name}', '${campaign.st_dt}', '${campaign.end_dt}', ${campaign.bgt}, '${campaign.channel}', '${campaign.target_seg}', '${campaign.KPI}');`);
    });
    
    // Campaign Results
    data.campaignResults.forEach(result => {
        insertStatements.push(`INSERT INTO campaign_results (camp_id, metric, val, dt) 
        VALUES ('${result.camp_id}', '${result.metric}', ${result.val}, '${result.dt}');`);
    });
    
    // Financial Data
    data.financialData.forEach(finance => {
        const notes = finance.notes ? `'${finance.notes}'` : 'NULL';
        insertStatements.push(`INSERT INTO financial_data (period, department, type, actual, budget, variance, notes) 
        VALUES ('${finance.period}', '${finance.department}', '${finance.type}', ${finance.actual}, ${finance.budget}, ${finance.variance}, ${notes});`);
    });
    
    // Operational Expenses
    data.operationalExpenses.forEach(expense => {
        insertStatements.push(`INSERT INTO operational_expenses (dt, cat, amount, dept_code, approved_by, status) 
        VALUES ('${expense.dt}', '${expense.cat}', ${expense.amount}, '${expense.dept_code}', '${expense.approved_by}', '${expense.status}');`);
    });
    
    // Employees
    data.employees.forEach(employee => {
        const manager = employee.manager ? `'${employee.manager}'` : 'NULL';
        insertStatements.push(`INSERT INTO employees (emp_id, name, dept, role, joined, salary_band, manager, status) 
        VALUES ('${employee.emp_id}', '${employee.name}', '${employee.dept}', '${employee.role}', '${employee.joined}', '${employee.salary_band}', ${manager}, '${employee.status}');`);
    });
    
    // Performance
    data.performance.forEach(perf => {
        const comments = perf.comments ? `'${perf.comments}'` : 'NULL';
        insertStatements.push(`INSERT INTO performance (emp_id, period, rating, comments, goals_met, a1, p1) 
        VALUES ('${perf.emp_id}', '${perf.period}', ${perf.rating}, ${comments}, ${perf.goals_met}, ${perf.a1}, ${perf.p1});`);
    });
    
    return insertStatements;
};

/**
 * Insert sample data into the database
 * @param {Object} db Database connection
 */
const insertSampleData = async (db) => {
    const data = generateSampleData();
    const insertStatements = generateInsertStatements(data);
    
    // Execute all insert statements
    for (const statement of insertStatements) {
        try {
            await db.run(statement);
        } catch (error) {
            console.error(`Error executing: ${statement}`);
            console.error(error);
        }
    }
    
    console.log('Sample data inserted successfully!');
};

module.exports = {
    generateSampleData,
    generateInsertStatements,
    insertSampleData
};