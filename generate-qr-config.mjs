import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置不同的环境URL
const environments = {
  development: 'http://localhost:5173',
  production: 'https://deco-a2.vercel.app',
  staging: 'https://staging.your-domain.com' // 如无测试环境，可忽略
};

// 生成系统入口二维码
async function generateSystemQR(environment = 'development') {
  try {
    const systemUrl = environments[environment];
    
    if (!systemUrl) {
      throw new Error(`不支持的环境: ${environment}`);
    }
    
    console.log(`🚀 正在为 ${environment} 环境生成二维码...`);
    console.log(`🔗 系统URL: ${systemUrl}`);
    
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
    const fileName = `system-entry-qr-${environment}.png`;
    const outputPath = path.join(__dirname, fileName);
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ 系统入口二维码已生成！');
    console.log(`📁 文件位置: ${outputPath}`);
    console.log(`🔗 二维码链接: ${systemUrl}`);
    console.log('');
    console.log('📱 使用方法:');
    console.log('1. 将生成的二维码图片用于宣传材料');
    console.log('2. 用户扫描二维码即可直接进入系统');
    console.log('3. 支持所有智能手机的扫码功能');
    console.log('');
    console.log('📋 二维码信息:');
    console.log(`- 环境: ${environment}`);
    console.log(`- 尺寸: 512x512 像素`);
    console.log(`- 纠错级别: M (中等)`);
    console.log(`- 边距: 2`);
    
  } catch (error) {
    console.error('❌ 生成二维码失败:', error.message);
  }
}

// 生成所有环境的二维码
async function generateAllEnvironments() {
  console.log('🎯 开始生成所有环境的二维码...\n');
  
  for (const env of Object.keys(environments)) {
    await generateSystemQR(env);
    console.log('─'.repeat(50));
  }
  
  console.log('🎉 所有环境的二维码生成完成！');
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const environment = args[0] || 'development';
  
  if (environment === 'all') {
    await generateAllEnvironments();
  } else {
    await generateSystemQR(environment);
  }
}

// 运行主函数
main().catch(console.error);
