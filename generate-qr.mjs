import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成系统入口二维码
async function generateSystemQR() {
  try {
    // 获取当前目录
    const currentDir = __dirname;
    
    // 系统入口URL - 您可以根据实际部署情况修改
    const systemUrl = 'http://localhost:5173'; // 开发环境
    // const systemUrl = 'https://your-domain.com'; // 生产环境
    
    // 生成二维码
    const qrCodeDataURL = await QRCode.toDataURL(systemUrl, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // 将base64转换为Buffer
    const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // 保存文件
    const outputPath = path.join(currentDir, 'system-entry-qr.png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ 系统入口二维码已生成！');
    console.log(`📁 文件位置: ${outputPath}`);
    console.log(`🔗 二维码链接: ${systemUrl}`);
    console.log('');
    console.log('📱 使用方法:');
    console.log('1. 将生成的二维码图片用于宣传材料');
    console.log('2. 用户扫描二维码即可直接进入系统');
    console.log('3. 支持所有智能手机的扫码功能');
    
  } catch (error) {
    console.error('❌ 生成二维码失败:', error);
  }
}

// 运行生成函数
generateSystemQR();
