import javax.swing.*;
import javax.swing.border.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class TichDiemKhachHang {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(UI::new);
    }
}

class UI extends JFrame {

    public UI() {
        setTitle("Quản lý khách hàng");
        setSize(1050, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        getContentPane().setBackground(new Color(240, 240, 240));

        // ===== LEFT =====
        JPanel left = new JPanel(new BorderLayout());
        left.setBorder(new EmptyBorder(15,15,15,15));
        left.setBackground(new Color(240,240,240));

        // Top bar
        JPanel top = new JPanel(new FlowLayout(FlowLayout.LEFT,10,5));
        top.setOpaque(false);

        JTextField search = new JTextField("  🔍 Tìm khách hàng",20);
        search.setPreferredSize(new Dimension(200,35));
        search.setBorder(new LineBorder(Color.LIGHT_GRAY,1,true));

        JButton addBtn = new JButton("＋ Thêm KH");
        addBtn.setBackground(new Color(70,130,180));
        addBtn.setForeground(Color.WHITE);
        addBtn.setFocusPainted(false);

        top.add(search);
        top.add(addBtn);

        // Title
        JLabel title = new JLabel("Danh sách khách hàng thân thiết");
        title.setFont(new Font("Segoe UI", Font.BOLD, 18));

        // Table
        String[] cols = {"ID","Tên khách hàng","Hạng","Điểm",""};
        Object[][] data = {
                {"001","Nguyễn Văn A","Vàng","1250","Xem"},
                {"002","Nguyễn Văn B","Bạc","500","Xem"},
                {"003","Trần Văn C","Đồng","200","Xem"},
                {"004","Lê Thị D","Kim Cương","3000","Xem"},
        };

        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(35);
        table.setFont(new Font("Segoe UI", Font.PLAIN,14));
        table.getTableHeader().setFont(new Font("Segoe UI", Font.BOLD,14));
        table.getTableHeader().setBackground(new Color(200,170,120));

        JScrollPane scroll = new JScrollPane(table);
        scroll.setBorder(new LineBorder(Color.LIGHT_GRAY,1,true));

        // Config
        JPanel config = new JPanel();
        config.setLayout(new BoxLayout(config,BoxLayout.Y_AXIS));
        config.setOpaque(false);
        config.setBorder(new EmptyBorder(10,0,0,0));

        JLabel cfgTitle = new JLabel("Cấu hình đổi thưởng");
        cfgTitle.setFont(new Font("Segoe UI",Font.BOLD,14));

        config.add(cfgTitle);
        config.add(new JLabel("- 10k VNĐ = 1 điểm"));
        config.add(new JLabel("- Giảm giá hạng Vàng: 10%"));

        JPanel topWrap = new JPanel(new BorderLayout());
        topWrap.setOpaque(false);
        topWrap.add(top,BorderLayout.NORTH);
        topWrap.add(title,BorderLayout.SOUTH);

        left.add(topWrap,BorderLayout.NORTH);
        left.add(scroll,BorderLayout.CENTER);
        left.add(config,BorderLayout.SOUTH);

        // ===== RIGHT =====
        JPanel right = new JPanel();
        right.setPreferredSize(new Dimension(320,0));
        right.setLayout(new BorderLayout());
        right.setBorder(new EmptyBorder(10,10,10,10));

        // Gradient Panel
        JPanel container = new JPanel() {
            protected void paintComponent(Graphics g) {
                Graphics2D g2 = (Graphics2D) g;
                GradientPaint gp = new GradientPaint(0,0,new Color(255,140,0),0,getHeight(),new Color(255,94,0));
                g2.setPaint(gp);
                g2.fillRoundRect(0,0,getWidth(),getHeight(),20,20);
            }
        };
        container.setLayout(new BorderLayout());
        container.setOpaque(false);
        container.setBorder(new EmptyBorder(15,15,15,15));

        // Account
        JLabel account = new JLabel("Tài khoản: Admin",SwingConstants.CENTER);
        account.setForeground(Color.WHITE);
        account.setFont(new Font("Segoe UI",Font.BOLD,16));

        // Detail
        JPanel detail = new JPanel();
        detail.setLayout(new BoxLayout(detail,BoxLayout.Y_AXIS));
        detail.setOpaque(false);

        JLabel dTitle = new JLabel("Chi tiết thành viên");
        JLabel name = new JLabel("Nguyễn Văn A");
        JLabel info = new JLabel("Hạng: Vàng | Điểm: 1250");

        JLabel r1 = new JLabel("🎁 ĐỔI VOUCHER 20%");
        JLabel r2 = new JLabel("☕ TẶNG 1 CAFE");

        for (JLabel l : new JLabel[]{dTitle,name,info,r1,r2}) {
            l.setForeground(Color.WHITE);
            l.setAlignmentX(Component.CENTER_ALIGNMENT);
        }

        detail.add(dTitle);
        detail.add(Box.createVerticalStrut(10));
        detail.add(name);
        detail.add(info);
        detail.add(Box.createVerticalStrut(10));
        detail.add(r1);
        detail.add(r2);

        // History
        JPanel history = new JPanel();
        history.setLayout(new BoxLayout(history,BoxLayout.Y_AXIS));
        history.setOpaque(false);

        JLabel hTitle = new JLabel("LỊCH SỬ");
        JLabel h1 = new JLabel("+25đ (10/04)");
        JLabel h2 = new JLabel("-100đ (08/04)");
        JLabel h3 = new JLabel("+15đ (05/04)");

        for (JLabel l : new JLabel[]{hTitle,h1,h2,h3}) {
            l.setForeground(Color.WHITE);
        }

        history.add(hTitle);
        history.add(h1);
        history.add(h2);
        history.add(h3);

        container.add(account,BorderLayout.NORTH);
        container.add(detail,BorderLayout.CENTER);
        container.add(history,BorderLayout.SOUTH);

        right.add(container);

        // Add
        add(left,BorderLayout.CENTER);
        add(right,BorderLayout.EAST);

        setVisible(true);
    }
}