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

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    company VARCHAR(100),
    role ENUM('admin', 'sales', 'support') DEFAULT 'sales',
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (email)
);

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
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_type (type)
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('call', 'email', 'meeting', 'note') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    customer_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_type (type)
);

-- Create indexes for better performance
CREATE INDEX idx_customer_status ON customers(status);
CREATE INDEX idx_interaction_date ON interactions(date);
CREATE INDEX idx_interaction_status ON interactions(status);
CREATE INDEX idx_activity_created ON activities(created_at);

-- Insert sample users
INSERT INTO users (id, name, email, password, company, role) VALUES
(UUID(), 'Admin User', 'admin@crm.com', '$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2', 'CRM Company', 'admin'),
(UUID(), 'Sales Manager', 'sales@crm.com', '$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2', 'CRM Company', 'sales'),
(UUID(), 'Support Agent', 'support@crm.com', '$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2', 'CRM Company', 'support');

-- Insert all sample customers in one batch
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
(UUID(), 'Emma Thompson', 'emma.t@startup.com', '+1222333444', 'StartupHub', 'inactive', 'Former client, potential return'),
(UUID(), 'Alex Chen', 'alex.c@techhub.com', '+1999888777', 'TechHub', 'lead', 'Interested in AI solutions'),
(UUID(), 'Sophie Lee', 'sophie.l@digital.com', '+1888777666', 'Digital Solutions', 'customer', 'Enterprise client'),
(UUID(), 'Daniel Kim', 'daniel.k@cloud.com', '+1777666555', 'CloudTech', 'lead', 'Cloud migration project'),
(UUID(), 'Olivia Park', 'olivia.p@data.com', '+1666555444', 'DataCorp', 'customer', 'Data analytics project'),
(UUID(), 'William Zhang', 'william.z@mobile.com', '+1555444333', 'MobileFirst', 'lead', 'Mobile app development'),
(UUID(), 'Emma Wilson', 'emma.w@security.com', '+1444333222', 'SecureTech', 'customer', 'Security solutions'),
(UUID(), 'Lucas Brown', 'lucas.b@iot.com', '+1333222111', 'IoT Solutions', 'lead', 'IoT implementation'),
(UUID(), 'Ava Martinez', 'ava.m@blockchain.com', '+1222111000', 'BlockChain Co', 'customer', 'Blockchain project'),
(UUID(), 'Noah Garcia', 'noah.g@ai.com', '+1111000999', 'AI Innovations', 'lead', 'AI integration'),
(UUID(), 'Isabella Lee', 'isabella.l@vr.com', '+1999000888', 'VR Tech', 'customer', 'VR development'),
(UUID(), 'Ethan Wang', 'ethan.w@ar.com', '+1888000777', 'AR Solutions', 'lead', 'AR implementation'),
(UUID(), 'Mia Johnson', 'mia.j@ml.com', '+1777000666', 'ML Systems', 'customer', 'Machine learning project'),
(UUID(), 'James Chen', 'james.c@robotics.com', '+1666000555', 'RoboTech', 'lead', 'Robotics integration'),
(UUID(), 'Charlotte Kim', 'charlotte.k@automation.com', '+1555000444', 'AutoTech', 'customer', 'Automation project'),
(UUID(), 'Benjamin Park', 'benjamin.p@smart.com', '+1444000333', 'Smart Solutions', 'lead', 'Smart city project');

-- Insert all sample interactions in one batch
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
(UUID(), (SELECT id FROM customers WHERE email = 'emma.t@startup.com'), 'call', 'Re-engagement call', '2024-03-20 10:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'alex.c@techhub.com'), 'meeting', 'AI solution presentation', '2024-03-21 10:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'sophie.l@digital.com'), 'call', 'Project status update', '2024-03-20 14:30:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'daniel.k@cloud.com'), 'email', 'Cloud migration proposal', '2024-03-19 09:15:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'olivia.p@data.com'), 'meeting', 'Data analytics review', '2024-03-22 11:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'william.z@mobile.com'), 'call', 'App development discussion', '2024-03-18 13:00:00', 'cancelled'),
(UUID(), (SELECT id FROM customers WHERE email = 'emma.w@security.com'), 'meeting', 'Security assessment', '2024-03-23 15:30:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'lucas.b@iot.com'), 'email', 'IoT implementation plan', '2024-03-17 09:00:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'ava.m@blockchain.com'), 'call', 'Blockchain consultation', '2024-03-24 10:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'noah.g@ai.com'), 'meeting', 'AI integration planning', '2024-03-16 14:00:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'isabella.l@vr.com'), 'call', 'VR development update', '2024-03-25 11:30:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'ethan.w@ar.com'), 'email', 'AR proposal review', '2024-03-15 16:00:00', 'completed'),
(UUID(), (SELECT id FROM customers WHERE email = 'mia.j@ml.com'), 'meeting', 'ML project kickoff', '2024-03-26 09:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'james.c@robotics.com'), 'call', 'Robotics integration discussion', '2024-03-14 13:30:00', 'cancelled'),
(UUID(), (SELECT id FROM customers WHERE email = 'charlotte.k@automation.com'), 'meeting', 'Automation project review', '2024-03-27 15:00:00', 'scheduled'),
(UUID(), (SELECT id FROM customers WHERE email = 'benjamin.p@smart.com'), 'email', 'Smart city proposal', '2024-03-13 10:30:00', 'completed');

-- Insert all sample activities in one batch
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
(UUID(), 'call', 'Follow-up with Emma Thompson', 'Discussed potential new project', (SELECT id FROM customers WHERE email = 'emma.t@startup.com')),
(UUID(), 'call', 'Initial contact with Alex Chen', 'Discussed AI solutions and potential implementation', (SELECT id FROM customers WHERE email = 'alex.c@techhub.com')),
(UUID(), 'meeting', 'Project review with Sophie Lee', 'Reviewed current progress and next steps', (SELECT id FROM customers WHERE email = 'sophie.l@digital.com')),
(UUID(), 'email', 'Cloud migration details to Daniel Kim', 'Sent detailed migration plan and timeline', (SELECT id FROM customers WHERE email = 'daniel.k@cloud.com')),
(UUID(), 'call', 'Data analytics discussion with Olivia Park', 'Discussed data requirements and analysis methods', (SELECT id FROM customers WHERE email = 'olivia.p@data.com')),
(UUID(), 'meeting', 'Mobile app planning with William Zhang', 'Reviewed app features and development timeline', (SELECT id FROM customers WHERE email = 'william.z@mobile.com')),
(UUID(), 'email', 'Security assessment report to Emma Wilson', 'Sent detailed security analysis and recommendations', (SELECT id FROM customers WHERE email = 'emma.w@security.com')),
(UUID(), 'call', 'IoT implementation planning with Lucas Brown', 'Discussed IoT architecture and deployment', (SELECT id FROM customers WHERE email = 'lucas.b@iot.com')),
(UUID(), 'meeting', 'Blockchain consultation with Ava Martinez', 'Reviewed blockchain implementation strategy', (SELECT id FROM customers WHERE email = 'ava.m@blockchain.com')),
(UUID(), 'email', 'AI integration proposal to Noah Garcia', 'Sent detailed AI integration plan', (SELECT id FROM customers WHERE email = 'noah.g@ai.com')),
(UUID(), 'call', 'VR development update with Isabella Lee', 'Discussed VR features and progress', (SELECT id FROM customers WHERE email = 'isabella.l@vr.com'));

-- Create database user and grant privileges
DROP USER IF EXISTS 'crm_user'@'localhost';
CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'crm_password';
GRANT ALL PRIVILEGES ON crm_system.* TO 'crm_user'@'localhost';
FLUSH PRIVILEGES; 