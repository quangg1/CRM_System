-- Database connection information
-- Host: localhost
-- Port: 3306
-- Username: root
-- Password: your_password
-- Database: crm_system

-- Drop existing database and create new one
DROP DATABASE IF EXISTS crm_system;
CREATE DATABASE crm_system;
USE crm_system;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(100),
    status ENUM('lead', 'customer', 'inactive') DEFAULT 'lead',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (email)
);

-- Create interactions table
CREATE TABLE IF NOT EXISTS interactions (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    type ENUM('call', 'email', 'meeting', 'note') NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('call', 'email', 'meeting') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    customer_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Insert sample customers
INSERT INTO customers (id, name, email, phone, company, status, notes) VALUES
(UUID(), 'John Smith', 'john.smith@techcorp.com', '+1234567890', 'Tech Corp', 'customer', 'Main contact for enterprise solutions'),
(UUID(), 'Sarah Johnson', 'sarah.j@innovate.com', '+1987654321', 'Innovate Inc', 'lead', 'Interested in cloud services'),
(UUID(), 'Mike Brown', 'mike.b@global.com', '+1122334455', 'Global Solutions', 'customer', 'Regular client, monthly meetings'),
(UUID(), 'Emily Davis', 'emily.d@startup.com', '+1555666777', 'Startup Co', 'lead', 'New lead from conference'),
(UUID(), 'David Wilson', 'david.w@enterprise.com', '+1888999000', 'Enterprise Ltd', 'inactive', 'Former client, may return'),
(UUID(), 'Lisa Anderson', 'lisa.a@techstart.com', '+1777888999', 'TechStart', 'lead', 'Interested in mobile app development'),
(UUID(), 'Robert Taylor', 'robert.t@bigcorp.com', '+1666777888', 'BigCorp', 'customer', 'Enterprise client, annual contract'),
(UUID(), 'Maria Garcia', 'maria.g@innovate.com', '+1444555666', 'Innovate Solutions', 'lead', 'New lead from website'),
(UUID(), 'James Wilson', 'james.w@globaltech.com', '+1333444555', 'GlobalTech', 'customer', 'Regular client, quarterly meetings'),
(UUID(), 'Emma Thompson', 'emma.t@startup.com', '+1222333444', 'StartupHub', 'inactive', 'Former client, potential return');

-- Insert sample interactions (using customer IDs from above)
INSERT INTO interactions (id, customer_id, type, description, date, status) VALUES
(UUID(), (SELECT id FROM customers WHERE email = 'john.smith@techcorp.com'), 'meeting', 'Quarterly review meeting', '2024-03-15 10:00:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'sarah.j@innovate.com'), 'call', 'Initial consultation call', '2024-03-16 14:30:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'mike.b@global.com'), 'email', 'Sent proposal for new project', '2024-03-14 09:15:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'john.smith@techcorp.com'), 'note', 'Follow up on meeting action items', '2024-03-15 15:00:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'emily.d@startup.com'), 'meeting', 'Product demo meeting', '2024-03-17 11:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'lisa.a@techstart.com'), 'call', 'Follow-up call about mobile app', '2024-03-18 13:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'robert.t@bigcorp.com'), 'meeting', 'Annual contract review', '2024-03-19 15:30:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'maria.g@innovate.com'), 'email', 'Sent welcome package', '2024-03-17 09:00:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'james.w@globaltech.com'), 'note', 'Updated project timeline', '2024-03-16 16:45:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'emma.t@startup.com'), 'call', 'Re-engagement call', '2024-03-20 10:00:00', 'scheduled');

-- Insert sample activities (using customer IDs from above)
INSERT INTO activities (id, type, title, description, customer_id) VALUES
(UUID(), 'call', 'Follow-up call with John Smith', 'Discussed project timeline and deliverables', (SELECT id FROM customers WHERE email = 'john.smith@techcorp.com')),
(UUID(), 'email', 'Proposal sent to Sarah Johnson', 'Sent detailed proposal for cloud migration', (SELECT id FROM customers WHERE email = 'sarah.j@innovate.com')),
(UUID(), 'meeting', 'Monthly review with Mike Brown', 'Reviewed current projects and discussed new opportunities', (SELECT id FROM customers WHERE email = 'mike.b@global.com')),
(UUID(), 'call', 'Initial contact with Emily Davis', 'Introduced our services and scheduled demo', (SELECT id FROM customers WHERE email = 'emily.d@startup.com')),
(UUID(), 'email', 'Re-engagement email to David Wilson', 'Sent information about new services', (SELECT id FROM customers WHERE email = 'david.w@enterprise.com')),
(UUID(), 'meeting', 'Mobile app planning with Lisa Anderson', 'Discussed app features and timeline', (SELECT id FROM customers WHERE email = 'lisa.a@techstart.com')),
(UUID(), 'call', 'Contract discussion with Robert Taylor', 'Reviewed terms and conditions', (SELECT id FROM customers WHERE email = 'robert.t@bigcorp.com')),
(UUID(), 'email', 'Welcome email to Maria Garcia', 'Sent company information and next steps', (SELECT id FROM customers WHERE email = 'maria.g@innovate.com')),
(UUID(), 'meeting', 'Project update with James Wilson', 'Discussed progress and challenges', (SELECT id FROM customers WHERE email = 'james.w@globaltech.com')),
(UUID(), 'call', 'Follow-up with Emma Thompson', 'Discussed potential new project', (SELECT id FROM customers WHERE email = 'emma.t@startup.com'));

-- Create indexes for better performance
CREATE INDEX idx_customer_status ON customers(status);
CREATE INDEX idx_interaction_date ON interactions(date);
CREATE INDEX idx_interaction_status ON interactions(status);
CREATE INDEX idx_activity_created ON activities(created_at);

-- Create database user and grant privileges
DROP USER IF EXISTS 'crm_user'@'localhost';
CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'crm_password';
GRANT ALL PRIVILEGES ON crm_system.* TO 'crm_user'@'localhost';
FLUSH PRIVILEGES; 